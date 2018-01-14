module Model exposing (Model, initialModel)

import Types exposing (..)


-- Model


type alias Model =
    { instanceUrl : String
    , clientId : String
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
        "https://mastodon.me.uk"
        "905d23a2af70cd9eb36fce45febf533a46e20398fcc94afb1900558abe1a012b"
        Nothing
        ""
        Nothing
        ""
        Nothing
        []
        Home
        ""
