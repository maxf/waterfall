module Update exposing (Msg(UserAskedToDeleteAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetUsersResult, UserSelected, UrlChange), update, hashForDate, hashForTimestamp, dateFromUrl, filenameFromUrl)

import String exposing (slice, left, cons)
import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload))
import Json.Decode
import Time.DateTime exposing (DateTime, month, toISO8601, fromISO8601, fromTimestamp)
import Navigation exposing (Location)
import Regex exposing (regex, HowMany(All, AtMost), replace, find)
import Types exposing (maxNbPictures, PhotoMetadata, ErrorState(Error, NoError), DirectoryName, UserName, SecondsSinceEpoch, FileName, buildMeta)
import Ports exposing (deletePhoto)
import Model exposing (Model, DisplayDate(Date, BadDate), withDateShown, withPhotoShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, dateShown, photoDir, withUsers)


type Msg
    = ScrollPhotosFinished
    | UserAskedToDeleteAPhoto PhotoMetadata
    | UserClickedOnPhoto
    | PhotoWasDeleted String
    | ScanPhotosResult (Result Http.Error (List PhotoMetadata))
    | GetUsersResult (Result Http.Error (List String))
    | UserSelected UserName
    | UrlChange Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ScrollPhotosFinished ->
            ( model, Cmd.none )

        UserAskedToDeleteAPhoto metadata ->
            ( model, deletePhoto ( model |> photoDir, metadata.relativeFilePath ) )

        UserClickedOnPhoto ->
            ( model |> withPhotoShown Nothing, Cmd.none )

        PhotoWasDeleted deletedFilePath ->
            if deletedFilePath /= "" then
                ( model |> removePhoto deletedFilePath
                , Cmd.none
                )
            else
                ( model, Cmd.none )

        ScanPhotosResult (Err httpError) ->
            ( model |> withError (Error (httpError |> toString)), Cmd.none )

        ScanPhotosResult (Ok metadataList) ->
            let
                metadata =
                    buildMeta metadataList

                newModel =
                    model
                        |> withPhotoMetadata metadata
                        |> withError NoError
                        |> withMaxPicturesInADay (maxNbPictures metadata)

                monthForScroll =
                    case model |> dateShown of
                        Date date ->
                            date |> month

                        _ ->
                            1
            in
                ( newModel, scrollPanes monthForScroll )

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


scrollPanes : Int -> Cmd Msg
scrollPanes monthNumber =
    let
        calendarYScroll =
            1000 * (toFloat monthNumber - 1) / 12
    in
        Task.attempt
            (\_ -> ScrollPhotosFinished)
            (Task.sequence
                [ Dom.Scroll.toTop "photos"
                , Dom.Scroll.toY "calendar" calendarYScroll
                ]
            )


scanPhotos : DirectoryName -> Cmd Msg
scanPhotos dir =
    let
        photoMetadataDecoder =
            Json.Decode.map2
                PhotoMetadata
                (Json.Decode.field "path" Json.Decode.string)
                (Json.Decode.field "date" Json.Decode.int)

        apiUrl =
            "api.php?cmd=scan&dir=" ++ dir

        request =
            Http.get apiUrl (Json.Decode.list photoMetadataDecoder)
    in
        Http.send ScanPhotosResult request


toString : Http.Error -> String
toString error =
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
            find (AtMost 1) (regex "^#[^_]+_(.+)$") location.hash
    in
        case matches |> List.map .submatches of
            [ [ Just name ] ] ->
                Just (name |> replace All (regex "=") (\_ -> "/"))

            _ ->
                Nothing
