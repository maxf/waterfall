module Main exposing (main)

import Navigation exposing (Location)
import View exposing (view)
import Model exposing (Model, initialModel)
import Update exposing (update)
import Ports exposing (localStorageRetrievedItem)
import Types exposing (..)
import Auth exposing (checkAuthToken)


main : Program Never Model Msg
main =
    Navigation.program UrlHasChanged
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : Location -> ( Model, Cmd msg )
init location =
    let
        timeline =
            if location.hash == "#public" then Public else Home
    in
        ( { initialModel | timelineType = timeline }, checkAuthToken )


subscriptions : Model -> Sub Msg
subscriptions _ =
    localStorageRetrievedItem AuthTokenRetrieved
