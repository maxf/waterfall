module Model exposing (Model, Status, initialModel)

-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#status


type alias Status =
    { id : String
    , url : String
    , content : String
    }

type alias Model =
    { instanceUrl : String
    , authToken : Maybe String
    , username : String
    , password : String
    , message : Maybe String
    , timeline : List Status
    }

initialModel =
    Model
        "" Nothing "" "" Nothing []
