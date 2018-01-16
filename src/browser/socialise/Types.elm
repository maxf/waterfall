module Types exposing (..)

import Http
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import Navigation exposing (Location)


type Msg
    = Username String
    | ServerSelect String
    | Password String
    | AuthSubmit
    | AuthReturn (Result Http.Error AuthResponse)
    | ShareTextInput String
    | ShareImage
    | ImageShared (Result Http.Error String)
    | TimelineFetched (Result Http.Error (List Status))
    | UserFetched (Result Http.Error Account)
    | CloseMessage
    | AuthTokenRetrieved ( String, Maybe String )
    | UrlHasChanged Location
    | Logout


type alias AuthResponse =
    { token : String }


type alias MastodonServer =
    { url : String
    , clientId : String
    }

defaultServer =
    MastodonServer
        "https://mastodon.me.uk"
        "905d23a2af70cd9eb36fce45febf533a46e20398fcc94afb1900558abe1a012b"

servers : List MastodonServer
servers =
    [ defaultServer
    , MastodonServer
        "https://mastodon.social"
        "7b07523894c7441f0334bcc79ff100abe91f187cc21befeb3ade360df581d37e"
    , MastodonServer
        "https://pawoo.net"
        "e0becd2b4d162124a074e168908f83cec9f2d83bdbd141c3da5884ce60804045"
    ]


lookupServer : String -> Maybe MastodonServer
lookupServer url =
    List.head (List.filter (\s -> s.url == url ) servers)


-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#account


type alias Account =
    { id : String -- The ID of the account
    , acct : String -- username for local users, includes @domain for remote ones
    , displayName : String -- The account's display name
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



-- type of UI displayed on screen


type Screen
    = Home
    | PublicTimeline
    | User String -- User <user id>
    | Share String -- Share <path of photo to share>



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
        |> required "id" string
        |> required "acct" string
        |> required "display_name" string


statusDecoder : Decoder Status
statusDecoder =
    succeed Status
        |> required "id" string
        |> optional "url" (nullable string) Nothing
        |> required "account" accountDecoder
        |> optional "content" (nullable string) Nothing
        |> required "media_attachments" (list mediaAttachmentDecoder)
