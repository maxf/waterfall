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
import Types exposing (..)
import Update exposing (photoHashParts, update, getStatus, getTimeline)
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
    case url.fragment of
        Nothing ->
            ( initialModel key HomePage, checkAuthToken )

        Just "home" ->
            ( initialModel key HomePage, checkAuthToken )

        Just "me" ->
            ( initialModel key ProfilePage, checkAuthToken )

        Just fragment ->
            if String.startsWith "user:" fragment then
                let
                    userId =
                        String.dropLeft 5 fragment
                    model =
                        initialModel key (UserPage userId)
                in
                ( model
                , getTimeline model.server.url model.authToken (UserPage userId)
                )

            else if String.startsWith "photo:" fragment then
                case photoHashParts fragment of
                    Ok ( statusId, attachmentId ) ->
                        let
                            model =
                                initialModel key (PhotoPage statusId attachmentId)
                        in
                        ( model
                        , getStatus model.server.url model.authToken statusId
                        )

                    Err _ ->
                        ( initialModel key PublicTimeline
                        , Cmd.none
                        )

            else if String.startsWith "#share:" fragment then
                ( initialModel key (SharePathPage (String.dropLeft 6 fragment))
                , checkAuthToken
                )

            else if String.startsWith "#upload:" fragment then
                ( initialModel key (ShareUploadPage Nothing)
                , checkAuthToken
                )

            else
                ( initialModel key PublicTimeline
                , Nav.pushUrl key "#public"
                )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ localStorageRetrievedItem (Auth << AuthTokenRetrievedFromLocalStorage)
        , formImageRetrieved (Share << FormImageRead)
        , statusPosted (Share << StatusPosted)
        ]
