module Auth exposing (..)

import Maybe exposing (withDefault)
import Http exposing (encodeUri)
import Json.Decode
import Json.Decode.Pipeline
import Ports exposing (localStorageGetItem, localStorageSetItem, localStorageRemoveItem)
import Types exposing (..)
import Model exposing (Model)


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
                ++ encodeUri (model.userEmail |> withDefault "")
                ++ "&scope=read+write+follow"
                ++ "&password="
                ++ encodeUri (model.password |> withDefault "")

        request =
            Http.post
                (model.server.url ++ "/oauth/token")
                (Http.stringBody "application/x-www-form-urlencoded" postParams)
                oauthResponseDecoder
    in
        Http.send (Auth << AuthReturn) request


oauthResponseDecoder : Json.Decode.Decoder AuthResponse
oauthResponseDecoder =
    Json.Decode.succeed AuthResponse
        |> Json.Decode.Pipeline.required "access_token" Json.Decode.string
