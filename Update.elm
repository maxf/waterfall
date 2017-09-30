module Update exposing (Msg(DeletePhoto, DeletePhotoResult, ScanPhotosResult, ShowPhotosForDate, DecrementYear, IncrementYear, GetUsersResult, UserSelected), update)

import Dom exposing (Error)
import Dom.Scroll
import Task
import Http exposing (Error(..), Response)
import Json.Decode exposing (Decoder, map2, list, string, field)
import Time.DateTime exposing (DateTime, year)
import Types exposing (addYear, dateOfFirstPhotoOfYear, maxNbPictures, PhotoMetadata, ErrorMessage, JsonString, iso8601ToEpochSeconds, DirectoryName, UserName)
import Ports exposing (deletePhoto)
import Model exposing (Model, withDateShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, photoMetadata, dateShown, photoDir, lastDateWithPhotos, withUsers)


type Msg
    = IncrementYear
    | DecrementYear
    | ShowPhotosForDate DateTime
    | ScrollPhotosFinished
    | DeletePhoto PhotoMetadata
    | DeletePhotoResult String
    | ScanPhotosResult (Result Http.Error (List PhotoMetadata))
    | GetUsersResult (Result Http.Error (List String))
    | UserSelected UserName


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        IncrementYear ->
            ( model
                |> withDateShown (addYear 1 (photoMetadata model) (dateShown model))
            , Cmd.none
            )

        DecrementYear ->
            ( model
                |> withDateShown (addYear -1 (photoMetadata model) (dateShown model))
            , Cmd.none
            )

        ShowPhotosForDate date ->
            ( model
                |> withDateShown date
                |> withError Nothing
            , Task.attempt scrollResult (Dom.Scroll.toTop "photos")
            )

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
            ( model |> withError (Just (httpError |> toString)), Cmd.none )

        ScanPhotosResult (Ok metadataList) ->
            let
                metadata =
                    Types.buildMeta metadataList

                date =
                    lastDateWithPhotos metadata

                -- dateOfFirstPhotoOfYear (model |> dateShown |> year) metadata
                newModel =
                    model
                        |> withPhotoMetadata metadata
                        |> withError Nothing
                        |> withMaxPicturesInADay (maxNbPictures metadata)
                        |> withDateShown date
            in
                ( newModel, Cmd.none )

        GetUsersResult (Err httpErrorMsg) ->
            ( model |> withError (Just "Error getting users")
            , Cmd.none
            )

        GetUsersResult (Ok userList) ->
            ( model |> withUsers userList
            , scanPhotos ""
            )

        UserSelected userName ->
            let
                userDir = if userName == "All" then "" else userName
            in
                ( model |> withPhotoDir userDir
                , scanPhotos userDir
                )


-- Misc


scrollResult : Result Dom.Error () -> Msg
scrollResult _ =
    ScrollPhotosFinished


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
