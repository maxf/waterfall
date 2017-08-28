module Update exposing (Msg(DeletePhoto, DeletePhotoResult, ScanPhotosResult, ShowPhotosForDate, DecrementYear, IncrementYear), update)

import Dom exposing (Error)
import Dom.Scroll
import Task
import Http
import Time.DateTime exposing (DateTime, year)
import Types exposing (addYear, dateOfFirstPhotoOfYear, maxNbPictures, PhotoMetadata, ErrorMessage, JsonString, iso8601ToEpochSeconds)
import Ports exposing (deletePhoto)
import Model exposing (Model, withDateShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, toJson, fromJson, photoMetadata, dateShown, photoDir, lastDateWithPhotos)


type Msg
    = IncrementYear
    | DecrementYear
    | ShowPhotosForDate DateTime
    | ScrollPhotosFinished
    | DeletePhoto PhotoMetadata
    | DeletePhotoResult String
    | ScanPhotosResult (Result Http.Error (List String))


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

        ScanPhotosResult (Err httpErrorMsg) ->
            ( model |> withError (Just "Error"), Cmd.none )

        ScanPhotosResult (Ok photoList) ->
            let
                fileNameToMetadata : String -> PhotoMetadata
                fileNameToMetadata filename =
                    PhotoMetadata
                        filename
                        (iso8601ToEpochSeconds (String.slice 4 24 filename))

                metadataList =
                    List.map fileNameToMetadata photoList

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



-- Misc


scrollResult : Result Dom.Error () -> Msg
scrollResult _ =
    ScrollPhotosFinished
