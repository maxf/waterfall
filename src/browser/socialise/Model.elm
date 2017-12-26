module Model exposing (Model, Status, AttachmentType(..), Attachment, initialModel)

-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#status


type alias Status =
    { id : String
    , url : String
    , content : String
    , mediaAttachments : List Attachment
    }



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#attachment


type AttachmentType
    = Image
    | Video
    | Gifv
    | Unknown


type alias Attachment =
    { id : String
    , type_ : AttachmentType
    , url : String -- URL of the locally hosted version of the image
    }



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
