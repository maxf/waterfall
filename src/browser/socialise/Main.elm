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
init url =
    let
        whatToShow =
            if url.hash == "#public" then
                PublicTimeline
            else if String.startsWith "#user:" url.hash then
                User (String.dropLeft 6 url.hash)
            else if String.startsWith "#share:" url.hash then
                Share (String.dropLeft 6 url.hash)
            else
                Home
    in
        ( { initialModel | screenShown = whatToShow }, checkAuthToken )


subscriptions : Model -> Sub Msg
subscriptions _ =
    localStorageRetrievedItem AuthTokenRetrieved
