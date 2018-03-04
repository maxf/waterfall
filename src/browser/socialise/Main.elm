module Main exposing (main)

import Navigation exposing (Location, modifyUrl)
import View exposing (view)
import Model exposing (Model, initialModel)
import Update exposing (update, photoHashParts)
import Ports
    exposing
        ( localStorageRetrievedItem
        , formImageRetrieved
        , statusPosted
        )
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


init : Location -> ( Model, Cmd Msg )
init url =
    if String.startsWith "#user:" url.hash then
        let
            userId =
                String.dropLeft 6 url.hash
        in
            ( { initialModel | view = UserPage userId }
            , Cmd.none
            )
    else if String.startsWith "#photo:" url.hash then
        case photoHashParts url.hash of
            Ok ( statusId, attachmentId ) ->
                ( { initialModel | view = PhotoPage statusId attachmentId }
                , Cmd.none
                )

            Err _ ->
                ( { initialModel | view = PublicTimeline }
                , Cmd.none
                )
    else if url.hash == "#home" then
        ( { initialModel | view = HomePage }
        , checkAuthToken
        )
    else if url.hash == "#me" then
        ( { initialModel | view = ProfilePage }
        , checkAuthToken
        )
    else if String.startsWith "#share:" url.hash then
        ( { initialModel | view = SharePathPage (String.dropLeft 7 url.hash) }
        , checkAuthToken
        )
    else if String.startsWith "#upload:" url.hash then
        ( { initialModel | view = ShareUploadPage Nothing }
        , checkAuthToken
        )
    else
        ( { initialModel | view = PublicTimeline }
        , modifyUrl "#public"
        )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ localStorageRetrievedItem (Auth << AuthTokenRetrievedFromLocalStorage)
        , formImageRetrieved (Share << FormImageRead)
        , statusPosted (Share << StatusPosted)
        ]
