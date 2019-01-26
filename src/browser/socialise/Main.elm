module Main exposing (main)

import Auth exposing (authenticate, checkIfAuthenticated)
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
import Update exposing (update)
import Url
import Url.Parser exposing ((</>), Parser, fragment, map, parse, query, string, top)
import Url.Parser.Query as Query
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



type alias QueryStringParams =
    { code : Maybe String
    , state : Maybe String
    }


type alias UrlData =
    { queryStringParams : QueryStringParams
    , fragment : Fragment
    }


queryStringParser : Query.Parser QueryStringParams
queryStringParser =
    Query.map2 QueryStringParams (Query.string "code") (Query.string "state")


codeIdentityParser : Parser (QueryStringParams -> Fragment -> a) a
codeIdentityParser =
    top </> query queryStringParser </> fragment identity


urlParser : Parser (UrlData -> a) a
urlParser =
    map UrlData codeIdentityParser


queryStringAndFragment : Url.Url -> Maybe UrlData
queryStringAndFragment url =
    parse urlParser { url | path = "" }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
    let
        startModel =
            initialModel key url
    in
    case queryStringAndFragment url of
        Nothing ->
            -- parsing the URL failed
            ( startModel, checkIfAuthenticated )

        Just { queryStringParams, fragment } ->
            case queryStringParams.code of
                Just code ->
                    -- this is an auth redirect page
                    let
                        newModel =
                            { startModel | authCode = Just code }
                    in
                    ( newModel, authenticate newModel )

                Nothing ->
                    -- any other page, first check if a user is logged in
                    ( initialModel key url, checkIfAuthenticated )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ localStorageRetrievedItem (Auth << AuthTokenRetrievedFromLocalStorage)
        , formImageRetrieved (Share << FormImageRead)
        , statusPosted (Share << StatusPosted)
        ]
