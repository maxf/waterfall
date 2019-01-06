module Auth exposing (authenticate, checkAuthToken, clearAuthToken, oauthResponseDecoder, storeAuthToken, loginUrl)

import Http
import Json.Decode
import Json.Decode.Pipeline
import Maybe exposing (withDefault)
import Model exposing (Model)
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
            model.baseUrl |> Url.toString

        query =
            "response_type=code&client_id=" ++ model.server.clientId ++ "&redirect_uri=" ++ redirectUrl ++ "&scope=read+write+follow+push&state=meh"
            -- https://authorization-server.com/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos&state=1234zyx
    in
        { serverUrl
            | path = "/oauth/authorize"
            , query = Just query
        }
        |> Url.toString


checkAuthToken : Cmd msg
checkAuthToken =
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
                ++ (model.baseUrl |> Url.toString)

        url =
            model.server.url
    in
    Http.post
        { url = Url.toString { url | path = "/oauth/token" }
        , body = Http.stringBody "application/x-www-form-urlencoded" postParams
        , expect = Http.expectJson (Auth << AuthReturn) oauthResponseDecoder
        }


oauthResponseDecoder : Json.Decode.Decoder AuthResponse
oauthResponseDecoder =
    Json.Decode.succeed AuthResponse
        |> Json.Decode.Pipeline.required "access_token" Json.Decode.string
