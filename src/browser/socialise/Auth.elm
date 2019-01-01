module Auth exposing (authenticate, checkAuthToken, clearAuthToken, oauthResponseDecoder, storeAuthToken)

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
            "client_id="
                ++ model.server.clientId
                ++ "&grant_type=password&username="
                ++ Url.percentEncode (model.userEmail |> withDefault "")
                ++ "&scope=read+write+follow"
                ++ "&password="
                ++ Url.percentEncode (model.password |> withDefault "")

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
