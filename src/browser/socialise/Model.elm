module Model exposing (Model, initialModel, changeServerUrl)

import Types exposing (..)


-- Model


type alias Model =
    { server : MastodonServer
    , authToken : Maybe String
    , username : String
    , userId : Maybe String
    , password : String
    , message : Maybe String
    , timeline : List Status
    , screenShown : Screen
    , shareText : String
    }


initialModel : Model
initialModel =
    Model
        defaultServer
        Nothing
        ""
        Nothing
        ""
        Nothing
        []
        Home
        ""


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
