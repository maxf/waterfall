port module Main exposing (..)

import Types exposing (..)
import Html


-- import Dict

import View
import Time.DateTime exposing (..)
import Dom exposing (Error)
import Dom.Scroll
import Task


main : Program Never Model Msg
main =
    Html.program
        { view = View.view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Msg )
init =
    ( Types.initialModel
    , loadModel ""
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        IncrementYear ->
            ( { model
                | dateShown =
                    addYear 1 model.photoMetadata model.dateShown
              }
            , Cmd.none
            )

        DecrementYear ->
            ( { model
                | dateShown =
                    addYear -1 model.photoMetadata model.dateShown
              }
            , Cmd.none
            )

        ShowPhotosForDate date ->
            ( { model | dateShown = date }
            , (Task.attempt scrollResult (Dom.Scroll.toTop "photos"))
            )

        ScrollPhotosFinished ->
            ( model, Cmd.none )

        DeletePhoto metadata ->
            ( model, deletePhoto metadata.fileName )

        DeletePhotoResult deletedPhotoFileName ->
            if deletedPhotoFileName /= "" then
                ( model |> removePhotoFromModel deletedPhotoFileName
                , saveModel (modelToString model)
                )
            else
                ( model, Cmd.none )

        ScanPhotosResult fileList ->
            let
                metadata : MetadataDict
                metadata =
                    Types.buildMeta fileList

                dateShown =
                    dateOfFirstPhotoOfYear (year model.dateShown) metadata

                newModel =
                    { model
                        | photoMetadata = metadata
                        , error = Nothing
                        , maxPicturesInADay = maxNbPictures metadata
                        , dateShown = dateShown
                    }
            in
                ( newModel, saveModel (modelToString newModel) )

        RequestPhotoDir ->
            ( model, requestPhotoDir "" )

        RequestPhotoDirResult paths ->
            case paths of
                [ path ] ->
                    ( { model | photoDir = path, error = Just "Scanning photos" }
                    , scanPhotos path
                    )

                _ ->
                    ( { model | error = Just "Error: bad response from photo dialog" }
                    , Cmd.none
                    )

        ModelSaved success ->
            ( model, Cmd.none )

        ModelLoaded modelJson ->
            ( Types.jsonToModel modelJson, Cmd.none )



-- ports


port deletePhoto : String -> Cmd msg


port scanPhotos : String -> Cmd msg


port requestPhotoDir : String -> Cmd msg


port saveModel : String -> Cmd msg


port loadModel : String -> Cmd msg



-- subscriptions


port deletePhotoResult : (String -> msg) -> Sub msg


port scanPhotosResult : (List String -> msg) -> Sub msg


port requestPhotoDirResult : (List String -> msg) -> Sub msg


port loadModelResult : (String -> msg) -> Sub msg


port saveModelResult : (Bool -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ requestPhotoDirResult RequestPhotoDirResult
        , deletePhotoResult DeletePhotoResult
        , scanPhotosResult ScanPhotosResult
        , saveModelResult ModelSaved
        , loadModelResult ModelLoaded
        ]



-- Misc


scrollResult : Result Dom.Error () -> Msg
scrollResult result =
    ScrollPhotosFinished
