module Types exposing (..)

import Http
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)


type Msg
    = Username String
    | Password String
    | InstanceUrl String
    | AuthSubmit
    | AuthReturn (Result Http.Error AuthResponse)
    | TimelineFetched (Result Http.Error (List Status))
    | CloseMessage
    | AuthTokenRetrieved ( String, Maybe String )


type alias AuthResponse =
    { token : String }



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#account


type alias Account =
    { username : String
    , displayName : String
    }



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#status


type alias Status =
    { id : String
    , url : Maybe String
    , account : Account
    , content : Maybe String
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
    , previewUrl : String -- URL of the preview image
    }



-- Decoders


timelineDecoder : Decoder (List Status)
timelineDecoder =
    list statusDecoder


attachmentTypeDecoder : String -> Decoder AttachmentType
attachmentTypeDecoder s =
    case s of
        "image" ->
            succeed Image

        "video" ->
            succeed Video

        "gifv" ->
            succeed Gifv

        _ ->
            succeed Unknown


mediaAttachmentDecoder : Decoder Attachment
mediaAttachmentDecoder =
    succeed Attachment
        |> required "id" string
        |> required "type" (string |> andThen attachmentTypeDecoder)
        |> required "url" string
        |> required "preview_url" string


accountDecoder : Decoder Account
accountDecoder =
    succeed Account
        |> required "username" string
        |> required "display_name" string


statusDecoder : Decoder Status
statusDecoder =
    succeed Status
        |> required "id" string
        |> optional "url" (nullable string) Nothing
        |> required "account" accountDecoder
        |> optional "content" (nullable string) Nothing
        |> required "media_attachments" (list mediaAttachmentDecoder)
