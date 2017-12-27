module Model exposing (Model, initialModel)

import Types exposing (Attachment, AttachmentType, Status)



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
        ""
        ""
        Nothing
        ""
        ""
        Nothing
        []
