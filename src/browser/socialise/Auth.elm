module Auth exposing (..)

import Http exposing (encodeUri)
import Json.Decode
import Json.Decode.Pipeline
import Ports exposing (localStorageGetItem, localStorageSetItem)
import Types exposing (Msg(..), AuthResponse)
import Model exposing (Model)


checkAuthToken : Cmd msg
checkAuthToken =
    localStorageGetItem "authToken"


storeAuthToken : String -> Cmd msg
storeAuthToken token =
    localStorageSetItem ( "authToken", token )


authenticate : Model -> Cmd Msg
authenticate model =
    let
        postParams : String
        postParams =
            "client_id="
                ++ model.clientId
                ++ "&grant_type=password&username="
                ++ encodeUri model.username
                ++ "&password="
                ++ encodeUri model.password

        request =
            Http.post
                (model.instanceUrl ++ "/oauth/token")
                (Http.stringBody "application/x-www-form-urlencoded" postParams)
                oauthResponseDecoder
    in
        Http.send AuthReturn request


oauthResponseDecoder : Json.Decode.Decoder AuthResponse
oauthResponseDecoder =
    Json.Decode.succeed AuthResponse
        |> Json.Decode.Pipeline.required "access_token" Json.Decode.string
