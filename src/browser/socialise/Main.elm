module Main exposing (main)

import Html exposing (program)
import View exposing (view)
import Model exposing (Model, initialModel)
import Update exposing (Msg, update)


main : Program Never Model Msg
main =
    program
        { init = ( initialModel, Cmd.none )
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
