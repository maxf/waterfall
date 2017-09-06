module Main exposing (main)

import Http
import Json.Decode exposing (list, string)
import Html
import View
import Model exposing (Model, photoDir)
import Update exposing (Msg(DeletePhotoResult, ScanPhotosResult, GetUsersResult), update)
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
    ( Model.initialModel, getUserList )


getUserList : Cmd Msg
getUserList =
    let
        apiUrl =
            "api.php?cmd=dirs"
        request =
            Http.get apiUrl (Json.Decode.list Json.Decode.string)
    in
        Http.send GetUsersResult request


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ deletePhotoResult DeletePhotoResult
        ]
