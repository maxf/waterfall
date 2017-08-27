module Main exposing (main)

import Html
import View
import Model exposing (Model)
import Update exposing (Msg(DeletePhotoResult, ScanPhotosResult, ModelSaved, ModelLoaded, SaveModel), update)
import Ports exposing (deletePhotoResult, scanPhotosResult, saveModelResult, loadModel, loadModelResult, applicationQuitting)


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
    ( Model.initialModel
    , loadModel ""
    )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ deletePhotoResult DeletePhotoResult
        , scanPhotosResult ScanPhotosResult
        , saveModelResult ModelSaved
        , loadModelResult ModelLoaded
        , applicationQuitting SaveModel
        ]
