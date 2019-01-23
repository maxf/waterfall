module Model exposing (Model, baseUrl, changeServerUrl, initialModel)

import Browser.Navigation as Nav
import Types exposing (..)
import Url exposing (Url)



-- Model


type alias Model =
    { currentUrl : Url -- full URL of this page
    , server : MastodonServer
    , authToken : Maybe String
    , authCode : Maybe String
    , userEmail : Maybe String
    , username : Maybe String
    , userId : Maybe String
    , message : Maybe String
    , timeline : List Status
    , view : Screen
    , shareText : String
    , currentStatus : Maybe Status
    , key : Nav.Key
    , otherUserId : Maybe String
    , otherUsername : Maybe String
    }


initialModel : Nav.Key -> Url -> Model
initialModel key url =
    { currentUrl = url
    , server = defaultServer
    , authToken = Nothing
    , authCode = Nothing
    , userEmail = Nothing
    , username = Nothing
    , userId = Nothing
    , message = Nothing
    , timeline = []
    , view = StartingPage
    , shareText = ""
    , currentStatus = Nothing
    , key = key
    , otherUserId = Nothing
    , otherUsername = Nothing
    }


baseUrl : Model -> String
baseUrl model =
    model.currentUrl
        |> Url.toString
        |> String.split "?"
        |> List.head
        |> Maybe.withDefault ""


changeServerUrl : Model -> String -> Model
changeServerUrl model url =
    let
        server =
            lookupServer url
    in
    case server of
        Nothing ->
            { model | server = defaultServer }

        Just s ->
            { model | server = s }
