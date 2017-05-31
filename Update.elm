module Update exposing (Msg(DeletePhoto, DeletePhotoResult, ScanPhotosResult, ShowPhotosForDate, DecrementYear, IncrementYear, RequestPhotoDir, RequestPhotoDirResult, ModelSaved, ModelLoaded, SaveModel), update)

import Dom exposing (Error)
import Dom.Scroll
import Task
import Time.DateTime exposing (DateTime, year)
import Types exposing (addYear, dateOfFirstPhotoOfYear, maxNbPictures, PhotoMetadata, ErrorMessage, JsonString)
import Ports exposing (deletePhoto, saveModel, requestPhotoDir, scanPhotos)
import Model exposing (Model, withDateShown, withError, withPhotoMetadata, withPhotoDir, withMaxPicturesInADay, removePhoto, toJson, fromJson, photoMetadata, dateShown, photoDir)


type Msg
    = IncrementYear
    | DecrementYear
    | ShowPhotosForDate DateTime
    | ScrollPhotosFinished
    | DeletePhoto PhotoMetadata
    | DeletePhotoResult ( String, String )
    | ScanPhotosResult (List PhotoMetadata)
    | RequestPhotoDir
    | RequestPhotoDirResult (List String)
    | ModelSaved Bool
      --    | ModelLoaded (Result ErrorMessage JsonString) ### CANT work because the value is returned from a port
    | ModelLoaded JsonString
    | SaveModel String


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
            ( model |> withDateShown date
            , Task.attempt scrollResult (Dom.Scroll.toTop "photos")
            )

        ScrollPhotosFinished ->
            ( model, Cmd.none )

        DeletePhoto metadata ->
            ( model, deletePhoto ( model |> photoDir, metadata.fileName ) )

        DeletePhotoResult ( _, deletedFileName ) ->
            if deletedFileName /= "" then
                ( model |> removePhoto deletedFileName
                , saveModel (toJson model)
                )
            else
                ( model, Cmd.none )

        ScanPhotosResult metadataList ->
            let
                metadata =
                    Types.buildMeta metadataList

                date =
                    dateOfFirstPhotoOfYear (model |> dateShown |> year) metadata

                newModel =
                    model
                        |> withPhotoMetadata metadata
                        |> withError Nothing
                        |> withMaxPicturesInADay (maxNbPictures metadata)
                        |> withDateShown date
            in
                ( newModel, saveModel (toJson newModel) )

        RequestPhotoDir ->
            ( model, requestPhotoDir "" )

        RequestPhotoDirResult paths ->
            case paths of
                [ path ] ->
                    ( model
                        |> withPhotoDir path
                        |> withError (Just "Scanning photos")
                    , scanPhotos path
                    )

                _ ->
                    ( model
                        |> withError (Just "Error: bad response from photo dialog")
                    , Cmd.none
                    )

        ModelSaved _ ->
            ( model, Cmd.none )

        ModelLoaded json ->
            if json == "" then
                ( model |> withError (Just "Failed to load model"), Cmd.none )
            else
                case fromJson json of
                    Err message ->
                        ( model |> withError (Just message), Cmd.none )

                    Ok newModel ->
                        ( newModel, Cmd.none )

        SaveModel _ ->
            ( model, saveModel (toJson model) )



-- Misc


scrollResult : Result Dom.Error () -> Msg
scrollResult _ =
    ScrollPhotosFinished
