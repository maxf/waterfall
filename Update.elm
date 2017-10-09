module Update exposing (Msg(DeletePhoto, DeletePhotoResult, ScanPhotosResult, GetUsersResult, UserSelected, UrlChange), update, hashForDate, dateFromUrl)

import String exposing (dropLeft, left, cons)
import Dom.Scroll
import Task
import Http exposing (Error(..), Response)
import Json.Decode exposing (Decoder, map2, list, string, field)
import Time.DateTime exposing (DateTime, year, toISO8601, fromISO8601, zero, dateTime)
import Navigation
import Result exposing (withDefault, toMaybe)
import Types exposing (addYear, dateOfFirstPhotoOfYear, maxNbPictures, PhotoMetadata, Error(ErrorMessage, NoError), JsonString, iso8601ToEpochSeconds, DirectoryName, UserName)
import Ports exposing (deletePhoto)
import Model exposing (Model, DisplayDate(Date, DateNotSpecified, BadDate), withDateShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, photoMetadata, dateShown, photoDir, lastDateWithPhotos, withUsers)


type Msg
    = ScrollPhotosFinished
    | DeletePhoto PhotoMetadata
    | DeletePhotoResult String
    | ScanPhotosResult (Result Http.Error (List PhotoMetadata))
    | GetUsersResult (Result Http.Error (List String))
    | UserSelected UserName
    | UrlChange Navigation.Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ScrollPhotosFinished ->
            ( model, Cmd.none )

        DeletePhoto metadata ->
            ( model, deletePhoto ( model |> photoDir, metadata.relativeFilePath ) )

        DeletePhotoResult deletedFilePath ->
            if deletedFilePath /= "" then
                ( model |> removePhoto deletedFilePath
                , Cmd.none
                )
            else
                ( model, Cmd.none )

        ScanPhotosResult (Err httpError) ->
            ( model |> withError (ErrorMessage (httpError |> toString)), Cmd.none )

        ScanPhotosResult (Ok metadataList) ->
            let
                metadata =
                    Types.buildMeta metadataList

                newModel =
                    model
                        |> withPhotoMetadata metadata
                        |> withError NoError
                        |> withMaxPicturesInADay (maxNbPictures metadata)
            in
                ( newModel, scrollPanes )

        GetUsersResult (Err httpErrorMsg) ->
            ( model |> withError (ErrorMessage "Error getting users")
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
                |> withError NoError
            , scrollPanes
            )


-- Misc

scrollPanes : Cmd Msg
scrollPanes =
    Task.attempt
        (\_ -> ScrollPhotosFinished)
        (Task.sequence
             [ Dom.Scroll.toTop "photos"
             , Dom.Scroll.toY "calendar" 300
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


dateFromUrl : Navigation.Location -> DisplayDate
dateFromUrl location =
    let
        fullDate =
            dropLeft 1 location.hash
            ++ "T00:00:00Z"
            |> fromISO8601
    in
        case fullDate of
            Ok date ->
                Date date
            Err message ->
                BadDate
