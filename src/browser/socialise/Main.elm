module Main exposing (main)

import Browser
import Browser.Navigation as Nav
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
import Url


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


init :  () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init flags url key =
    case url.fragment of
        Nothing ->
            ( initialModel key PublicTimeline, Cmd.none )

        Just "home" ->
            ( initialModel key HomePage, checkAuthToken )

        Just "me" ->
            ( initialModel key ProfilePage, checkAuthToken )

        Just fragment ->
            if String.startsWith "user:" fragment then
                let
                    userId =
                        String.dropLeft 5 fragment
                in
                ( initialModel key (UserPage userId)
                , checkAuthToken
                )
            else if String.startsWith "photo:" fragment then
                case photoHashParts fragment of
                    Ok ( statusId, attachmentId ) ->
                        ( initialModel key (PhotoPage statusId attachmentId)
                        , Cmd.none
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
