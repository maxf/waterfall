module Main exposing (main)

import Auth exposing (checkAuthToken)
import Browser
import Browser.Navigation as Nav
import Model exposing (Model, initialModel)
import Ports
    exposing
        ( formImageRetrieved
        , localStorageRetrievedItem
        , statusPosted
        )
import String exposing (startsWith)
import Types exposing (..)
import Update exposing (getStatus, getTimeline, photoHashParts, update)
import Url
import View exposing (view)


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlHasChanged
        , onUrlRequest = LinkWasClicked
        }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    let
        fragment =
            url.fragment |> Maybe.withDefault ""
    in
    if fragment |> startsWith "home" then
        ( initialModel key url HomePage, checkAuthToken )

    else if fragment |> startsWith "me" then
        ( initialModel key url ProfilePage, checkAuthToken )

    else if fragment |> startsWith "user:" then
        let
            userId =
                String.dropLeft 5 fragment

            model =
                initialModel key url (UserPage userId)
        in
        ( model
        , getTimeline model.server.url model.authToken (UserPage userId)
        )

    else if fragment |> startsWith "photo:" then
        case photoHashParts fragment of
            Ok ( statusId, attachmentId ) ->
                let
                    model =
                        initialModel key url (PhotoPage statusId attachmentId)
                in
                ( model
                , getStatus model.server.url model.authToken statusId
                )

            Err _ ->
                ( initialModel key url PublicTimeline
                , Cmd.none
                )

    else if fragment |> startsWith "share:" then
        ( initialModel key url (SharePathPage (String.dropLeft 6 fragment))
        , checkAuthToken
        )

    else if fragment |> startsWith "upload:" then
        ( initialModel key url (ShareUploadPage Nothing)
        , checkAuthToken
        )

    else
        ( initialModel key url PublicTimeline
        , Nav.pushUrl key "#public"
        )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ localStorageRetrievedItem (Auth << AuthTokenRetrievedFromLocalStorage)
        , formImageRetrieved (Share << FormImageRead)
        , statusPosted (Share << StatusPosted)
        ]
