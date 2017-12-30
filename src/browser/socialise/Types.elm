module Types exposing (..)

import Http
import Json.Decode
import Json.Decode.Pipeline


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
    , url : String
    , account : Account
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
    , previewUrl : String -- URL of the preview image
    }



-- Decoders


timelineDecoder : Json.Decode.Decoder (List Status)
timelineDecoder =
    Json.Decode.list statusDecoder


attachmentTypeDecoder : String -> Json.Decode.Decoder AttachmentType
attachmentTypeDecoder s =
    case s of
        "image" ->
            Json.Decode.succeed Image

        "video" ->
            Json.Decode.succeed Video

        "gifv" ->
            Json.Decode.succeed Gifv

        _ ->
            Json.Decode.succeed Unknown


mediaAttachmentDecoder : Json.Decode.Decoder Attachment
mediaAttachmentDecoder =
    Json.Decode.succeed Attachment
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "type"
            (Json.Decode.string |> Json.Decode.andThen attachmentTypeDecoder)
        |> Json.Decode.Pipeline.required "url" Json.Decode.string
        |> Json.Decode.Pipeline.required "preview_url" Json.Decode.string


accountDecoder : Json.Decode.Decoder Account
accountDecoder =
    Json.Decode.succeed Account
        |> Json.Decode.Pipeline.required "username" Json.Decode.string
        |> Json.Decode.Pipeline.required "display_name" Json.Decode.string


statusDecoder : Json.Decode.Decoder Status
statusDecoder =
    Json.Decode.succeed Status
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "url" Json.Decode.string
        |> Json.Decode.Pipeline.required "account" accountDecoder
        |> Json.Decode.Pipeline.required "content" Json.Decode.string
        |> Json.Decode.Pipeline.required "media_attachments"
            (Json.Decode.list mediaAttachmentDecoder)
