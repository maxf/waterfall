module Model exposing (Model, Status, initialModel)

type alias Status =
    { id : String
    , url : String
    , content : String
    }

type alias Model =
    { authToken : Maybe String
    , username : String
    , password : String
    , message : Maybe String
    , timeline : List Status
    }

initialModel =
    Model Nothing "" "" Nothing []
