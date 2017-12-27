module Types exposing (..)
import Http

type Msg
    = Username String
    | Password String
    | InstanceUrl String
    | AuthSubmit
    | AuthReturn (Result Http.Error AuthResponse)
    | TimelineFetched (Result Http.Error (List Status))
    | CloseMessage
    | AuthTokenRetrieved (String, Maybe String)


type alias AuthResponse =
    { token : String }


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
