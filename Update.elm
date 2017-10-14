module Update exposing (Msg(UserAskedToDeleteAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetUsersResult, UserSelected, UrlChange), update, hashForDate, hashForTimestamp, dateFromUrl, filenameFromUrl)

import String exposing (slice, left, cons)
import Dom.Scroll
import Task
import Http exposing (Error(..), Response)
import Json.Decode exposing (Decoder, map2, list, string, field)
import Time.DateTime exposing (DateTime, year, month, toISO8601, fromISO8601, zero, dateTime, fromTimestamp)
import Navigation exposing (Location, modifyUrl)
import Regex exposing (regex, HowMany(All, AtMost), replace, find)
import Result exposing (withDefault, toMaybe)
import Types exposing (addYear, dateOfFirstPhotoOfYear, maxNbPictures, PhotoMetadata, ErrorState(Error, NoError), JsonString, iso8601ToEpochSeconds, DirectoryName, UserName, SecondsSinceEpoch, FileName, buildMeta)
import Ports exposing (deletePhoto)
import Model exposing (Model, DisplayDate(Date, DateNotSpecified, BadDate), withDateShown, withPhotoShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, photoMetadata, dateShown, photoDir, lastDateWithPhotos, withUsers)


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

        GetUsersResult (Err httpErrorMsg) ->
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
scrollPanes month =
    let
        calendarYScroll =
            1000 * ((toFloat (month - 1)) / 12)
    in
        Task.attempt
            (\_ -> ScrollPhotosFinished)
            (Task.sequence
                [ Dom.Scroll.toTop "photos"
                , Dom.Scroll.toY "calendar" calendarYScroll
                ]
            )


scanPhotos : DirectoryName -> Cmd Msg
scanPhotos photoDir =
    let
        photoMetadataDecoder =
            Json.Decode.map2
                PhotoMetadata
                (Json.Decode.field "path" Json.Decode.string)
                (Json.Decode.field "date" Json.Decode.int)

        apiUrl =
            "api.php?cmd=scan&dir=" ++ photoDir

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

        BadStatus r ->
            "Bad status "

        BadPayload s r ->
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

            Err message ->
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
