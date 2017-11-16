module Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetUsersResult, UserSelected, UrlChange), update, hashForDate, hashForTimestamp, dateFromUrl, filenameFromUrl)

import String exposing (slice, left, cons)
import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload))
import Json.Decode
import Time.DateTime exposing (DateTime, toISO8601, fromISO8601, fromTimestamp)
import Navigation exposing (Location, modifyUrl)
import Regex exposing (regex, HowMany(AtMost), find)
import Types exposing (maxNbPictures, PhotoMetadata, ErrorState(Error, NoError), DirectoryName, UserName, SecondsSinceEpoch, FileName, RenamedPath, buildMeta)
import Model exposing (Model, DisplayDate(Date, BadDate), withDateShown, withPhotoShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, updatePhotoPath, withUsers, dateShown)


type Msg
    = ScrollPhotosFinished
    | UserAskedToDeleteAPhoto FileName
    | UserAskedToRotateAPhoto Int FileName
    | UserClickedOnPhoto
    | PhotoWasDeleted (Result Http.Error String)
    | PhotoWasRotated (Result Http.Error RenamedPath)
    | ScanPhotosResult (Result Http.Error (List PhotoMetadata))
    | GetUsersResult (Result Http.Error (List String))
    | UserSelected UserName
    | UrlChange Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ScrollPhotosFinished ->
            ( model, Cmd.none )

        UserClickedOnPhoto ->
            ( model |> withPhotoShown Nothing, Cmd.none )

        UserAskedToDeleteAPhoto fileName ->
            ( model, deletePhoto fileName )

        UserAskedToRotateAPhoto angle fileName ->
            ( model, rotatePhoto angle fileName )

        PhotoWasDeleted (Ok deletedFilePath) ->
            if deletedFilePath /= "" then
                let
                    hash =
                        case dateShown model of
                            Date d ->
                                hashForDate d

                            _ ->
                                "#"
                in
                    ( model |> removePhoto deletedFilePath, modifyUrl hash )
            else
                ( model, Cmd.none )

        PhotoWasDeleted (Err httpError) ->
            ( model |> withError (Error (httpError |> errorMessage)), Cmd.none )

        PhotoWasRotated (Ok renamedPath) ->
            ( model |> updatePhotoPath renamedPath, Cmd.none )

        PhotoWasRotated (Err httpError) ->
            ( model |> withError (Error (httpError |> errorMessage)), Cmd.none )

        ScanPhotosResult (Err httpError) ->
            ( model |> withError (Error (httpError |> errorMessage)), Cmd.none )

        ScanPhotosResult (Ok metadataList) ->
            let
                metadata =
                    buildMeta metadataList

                newModel =
                    model
                        |> withPhotoMetadata metadata
                        |> withError NoError
                        |> withMaxPicturesInADay (maxNbPictures metadata)
            in
                ( newModel
                , Task.attempt (\_ -> ScrollPhotosFinished) (Dom.Scroll.toTop "photos")
                )

        GetUsersResult (Err _) ->
            ( model |> withError (Error "Error getting users")
            , Cmd.none
            )

        GetUsersResult (Ok userList) ->
            ( model |> withUsers userList
            , scanPhotos ""
            )

        UserSelected userName ->
            let
                userDir =
                    if userName == "All" then
                        ""
                    else
                        userName
            in
                ( model |> withPhotoDir userDir
                , scanPhotos userDir
                )

        UrlChange location ->
            ( model
                |> withDateShown (dateFromUrl location)
                |> withPhotoShown (filenameFromUrl location)
                |> withError NoError
            , Cmd.none
            )



-- Misc


deletePhoto : FileName -> Cmd Msg
deletePhoto fileName =
    let
        request =
            Http.get
                ("api/delete?photo=" ++ fileName)
                Json.Decode.string
    in
        Http.send PhotoWasDeleted request


rotatePhoto : Int -> FileName -> Cmd Msg
rotatePhoto angle fileName =
    let
        rotatedDecoder =
            Json.Decode.map2
                RenamedPath
                (Json.Decode.field "old" Json.Decode.string)
                (Json.Decode.field "new" Json.Decode.string)

        request =
            Http.get
                ("api/rotate?angle=" ++ (toString angle) ++ "&photo=" ++ fileName)
                rotatedDecoder
    in
        Http.send PhotoWasRotated request


scanPhotos : DirectoryName -> Cmd Msg
scanPhotos dir =
    let
        photoMetadataDecoder =
            Json.Decode.map2
                PhotoMetadata
                (Json.Decode.field "path" Json.Decode.string)
                (Json.Decode.field "date" Json.Decode.int)

        apiUrl =
            "api/scan?dir=" ++ dir

        request =
            Http.get apiUrl (Json.Decode.list photoMetadataDecoder)
    in
        Http.send ScanPhotosResult request


errorMessage : Http.Error -> String
errorMessage error =
    case error of
        BadUrl url ->
            "Bad URL: " ++ url

        Timeout ->
            "Timeout"

        NetworkError ->
            "Network error"

        BadStatus _ ->
            "Bad status "

        BadPayload s _ ->
            "Bad payload: " ++ s


hashForDate : DateTime -> String
hashForDate date =
    date
        |> toISO8601
        |> left 10
        |> cons '#'



-- convert from 28429847298 to "#2012-12-22"


hashForTimestamp : SecondsSinceEpoch -> String
hashForTimestamp s =
    hashForDate (fromTimestamp (toFloat s * 1000))


dateFromUrl : Location -> DisplayDate
dateFromUrl location =
    let
        fullDate =
            slice 1 11 location.hash
                ++ "T00:00:00Z"
                |> fromISO8601
    in
        case fullDate of
            Ok date ->
                Date date

            Err _ ->
                BadDate


filenameFromUrl : Location -> Maybe FileName
filenameFromUrl location =
    -- converts from #2017-09-07_uploads-Misc-2017-09-06 20.14.25.jpg
    -- to uploads/Mist/2017-09-06 20.14.25.jpg
    let
        matches =
            find (AtMost 1) (regex "^#\\d{4}-\\d{2}-\\d{2}(.+)$") location.hash
    in
        case matches |> List.map .submatches of
            [ [ Just name ] ] ->
                Just name

            _ ->
                Nothing
