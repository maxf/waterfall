module Main exposing (main)

import Http
import Json.Decode
import Navigation
import View
import Model exposing (Model)
import Update exposing (Msg(PhotoWasDeleted, GetUsersResult, UrlChange), update, dateFromUrl, filenameFromUrl)
import Ports exposing (deletePhotoResult)


main : Program Never Model Msg
main =
    Navigation.program UrlChange
        { view = View.view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    ( Model.initialModel
        |> Model.withDateShown (dateFromUrl location)
        |> Model.withPhotoShown (filenameFromUrl location)
    , getUserList
    )


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
        [ deletePhotoResult PhotoWasDeleted
        ]
