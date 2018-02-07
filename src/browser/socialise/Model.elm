module Model exposing (Model, initialModel, changeServerUrl)

import Types exposing (..)


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
    }


initialModel : Model
initialModel =
    Model
        defaultServer
        Nothing
        Nothing
        Nothing
        Nothing
        Nothing
        Nothing
        []
        HomePage
        ""
        Nothing


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
