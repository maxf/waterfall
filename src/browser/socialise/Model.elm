module Model exposing (Model, initialModel)

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
        (MastodonServer
            "https://mastodon.social"
            "7b07523894c7441f0334bcc79ff100abe91f187cc21befeb3ade360df581d37e"
        )
        Nothing
        ""
        Nothing
        ""
        Nothing
        []
        Home
        ""
