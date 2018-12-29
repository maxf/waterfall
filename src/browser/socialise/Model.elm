module Model exposing (Model, initialModel, changeServerUrl)

import Types exposing (..)
import Browser.Navigation as Nav

-- Model


type alias Model =
    { server : MastodonServer
    , authToken : Maybe String
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


initialModel : Nav.Key -> Screen -> Model
initialModel key view =
   { server = defaultServer
   , authToken = Nothing
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
