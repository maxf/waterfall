module Main exposing (main)

import Html exposing (program)
import View exposing (view)
import Model exposing (Model, initialModel)
import Update exposing (update)
import Ports exposing (localStorageRetrievedItem)
import Types exposing (Msg(..))
import Auth exposing (checkAuthToken)


main : Program Never Model Msg
main =
    program
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : ( Model, Cmd msg )
init =
    ( initialModel, checkAuthToken )


subscriptions : Model -> Sub Msg
subscriptions _ =
    localStorageRetrievedItem AuthTokenRetrieved
