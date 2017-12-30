module Model exposing (Model, initialModel)

import Types exposing (Status)


-- Model


type alias Model =
    { instanceUrl : String
    , clientId : String
    , authToken : Maybe String
    , username : String
    , password : String
    , message : Maybe String
    , timeline : List Status
    }


initialModel : Model
initialModel =
    Model
        "https://mastodon.me.uk"
        "6f130a3305de5b3505618a2b6a05305e99ffea12bec5032eb576572319b5bda9"
        Nothing
        ""
        ""
        Nothing
        []
