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
    , screenShown : View
    , shareText : String
    , currentStatus : Maybe Status
    , currentPhoto : Maybe Attachment
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
        HomeTimeline
        ""
        Nothing
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
