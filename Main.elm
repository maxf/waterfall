module Main exposing (main)

import Http
import Json.Decode exposing (list, string)
import Html
import View
import Model exposing (Model)
import Update exposing (Msg(DeletePhotoResult, ScanPhotosResult), update)
import Ports exposing (deletePhotoResult)


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
    , scanPhotos
    )


scanPhotos : Cmd Msg
scanPhotos =
    let
        request =
            Http.get "photos.php" (Json.Decode.list Json.Decode.string)
    in
        Http.send ScanPhotosResult request


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ deletePhotoResult DeletePhotoResult
        ]
