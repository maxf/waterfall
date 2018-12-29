module Auth exposing (..)

import Maybe exposing (withDefault)
import Json.Decode
import Json.Decode.Pipeline
import Ports
    exposing
        ( localStorageGetItem
        , localStorageSetItem
        , localStorageRemoveItem
        )
import Types exposing (..)
import Model exposing (Model)
import Url
import Http


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

    in
    Http.post
        { url = model.server.url ++ "/oauth/token"
        , body = Http.stringBody "application/x-www-form-urlencoded" postParams
        , expect = Http.expectJson (Auth << AuthReturn) oauthResponseDecoder
        }



oauthResponseDecoder : Json.Decode.Decoder AuthResponse
oauthResponseDecoder =
    Json.Decode.succeed AuthResponse
        |> Json.Decode.Pipeline.required "access_token" Json.Decode.string
