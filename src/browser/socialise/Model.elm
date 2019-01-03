module Model exposing (Model, changeServerUrl, initialModel)

import Browser.Navigation as Nav
import Types exposing (..)
import Url exposing (Url)



-- Model


type alias Model =
    { baseUrl : Url
    , server : MastodonServer
    , authToken : Maybe String
    , authCode : Maybe String
    , userEmail : Maybe String
    , username : Maybe String
    , userId : Maybe String
    , password : Maybe String
    , message : Maybe String
    , timeline : List Status
    , view : Screen
    , shareText : String
    , currentStatus : Maybe Status
    , key : Nav.Key
    }


initialModel : Nav.Key -> Url -> Screen -> Model
initialModel key url view =
    { baseUrl = { url | fragment = Nothing }
    , server = defaultServer
    , authToken = Nothing
    , authCode = Nothing
    , userEmail = Nothing
    , username = Nothing
    , userId = Nothing
    , password = Nothing
    , message = Nothing
    , timeline = []
    , view = view
    , shareText = ""
    , currentStatus = Nothing
    , key = key
    }


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
