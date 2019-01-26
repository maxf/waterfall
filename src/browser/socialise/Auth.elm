module Auth exposing (authenticate, checkIfAuthenticated, clearAuthToken, loginUrl, oauthResponseDecoder, storeAuthToken)

import Http
import Json.Decode
import Json.Decode.Pipeline
import Maybe exposing (withDefault)
import Model exposing (Model, baseUrl)
import Ports
    exposing
        ( localStorageGetItem
        , localStorageRemoveItem
        , localStorageSetItem
        )
import Types exposing (..)
import Url


loginUrl : Model -> String
loginUrl model =
    let
        serverUrl =
            model.server.url

        redirectUrl =
            baseUrl model

        query =
            "response_type=code&client_id="
                ++ model.server.clientId
                ++ "&redirect_uri="
                ++ redirectUrl
                ++ "&scope=read+write+follow+push"
                ++ "&state=meh"
    in
    { serverUrl
        | path = "/oauth/authorize"
        , query = Just query
    }
        |> Url.toString


checkIfAuthenticated : Cmd msg
checkIfAuthenticated =
    localStorageGetItem "authToken"


storeAuthToken : String -> Cmd msg
storeAuthToken token =
    localStorageSetItem ( "authToken", token )


clearAuthToken : Cmd msg
clearAuthToken =
    localStorageRemoveItem "authToken"


authenticate : Model -> Cmd Msg
authenticate model =
    let
        postParams : String
        postParams =
            ""
                ++ "client_id="
                ++ model.server.clientId
                ++ "&client_secret="
                ++ model.server.clientSecret
                ++ "&grant_type=authorization_code"
                ++ "&scope=read+write+follow"
                ++ "&code="
                ++ (model.authCode |> withDefault "")
                ++ "&redirect_uri="
                ++ baseUrl model

        url =
            model.server.url
    in
    Http.post
        { url =
              Url.toString { url | path = "/oauth/token" }
        , body =
            Http.stringBody "application/x-www-form-urlencoded" postParams
        , expect =
            Http.expectJson (Auth << AuthReturn) oauthResponseDecoder
        }


oauthResponseDecoder : Json.Decode.Decoder AuthResponse
oauthResponseDecoder =
    Json.Decode.succeed AuthResponse
        |> Json.Decode.Pipeline.required "access_token" Json.Decode.string
