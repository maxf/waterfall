module Types exposing (Account, Attachment, AttachmentId(..), AttachmentType(..), AuthMsg(..), AuthResponse, ImagePortData, MastodonServer, Msg(..), Screen(..), ShareMsg(..), Status, StatusId(..), accountDecoder, attachmentDecoder, attachmentIdDecoder, attachmentIdToString, attachmentTypeDecoder, defaultServer, lookupServer, servers, statusDecoder, statusIdDecoder, statusIdToString, timelineDecoder)

import Browser
import Browser.Navigation as Nav
import Http
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import Url exposing (..)


type AuthMsg
    = UserEmail String
    | ServerSelect String
    | Password String
    | AuthSubmit
    | AuthReturn (Result Http.Error AuthResponse)
    | UserDetailsFetched (Result Http.Error Account)
    | AuthTokenRetrievedFromLocalStorage ( String, Maybe String )
    | Logout


type ShareMsg
    = ShareTextInput String
    | ShareImage
    | UploadImage
      --    | AttachmentUploaded (Result Http.Error Attachment)
    | StatusPosted (Maybe String)
    | ImageSelected
    | FormImageRead ImagePortData
    | ImageShared (Result Http.Error String)


type Msg
    = Auth AuthMsg
    | Share ShareMsg
    | TimelineFetched (Result Http.Error (List Status))
    | PhotoFetched (Result Http.Error Status)
    | CloseMessage
    | ViewPhoto Status Attachment
    | UrlHasChanged Url
    | LinkWasClicked Browser.UrlRequest


type alias AuthResponse =
    { token : String }


type alias MastodonServer =
    { url : Url
    , clientId : String
    }


type alias ImagePortData =
    { contents : String
    , filename : String
    }


defaultServer : MastodonServer
defaultServer =
    { url = Url Https "mastodon.social" Nothing "" Nothing Nothing
    , clientId = "7b07523894c7441f0334bcc79ff100abe91f187cc21befeb3ade360df581d37e"
    }


servers : List MastodonServer
servers =
    [ defaultServer
    , MastodonServer
        (Url Https "pawoo.net" Nothing "" Nothing Nothing)
        "e0becd2b4d162124a074e168908f83cec9f2d83bdbd141c3da5884ce60804045"
    ]


lookupServer : String -> Maybe MastodonServer
lookupServer url =
    List.head (List.filter (\s -> (toString s.url) == url) servers)



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#account


type alias Account =
    { id : String -- The ID of the account
    , acct : String -- username, includes @domain for remote users
    , displayName : String -- The account's display name
    }



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#status


type StatusId
    = StatusId String


statusIdToString : StatusId -> String
statusIdToString (StatusId sid) =
    sid


type alias Status =
    { id : StatusId
    , url : Maybe String
    , account : Account
    , content : Maybe String
    , attachments : List Attachment
    , sensitive : Bool -- Whether media attachments should be hidden by default
    }



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#attachment


type AttachmentType
    = Image
    | Video
    | Gifv
    | Unknown


type AttachmentId
    = AttachmentId String


attachmentIdToString : AttachmentId -> String
attachmentIdToString (AttachmentId aid) =
    aid


type alias Attachment =
    { id : AttachmentId
    , type_ : AttachmentType
    , url : String -- URL of the locally hosted version of the image
    , previewUrl : String -- URL of the preview image
    }



-- type of UI displayed on screen


type Screen
    = HomePage
    | LoginPage
    | ProfilePage
    | PublicTimeline
    | UserPage String -- <user id>
    | PhotoPage StatusId AttachmentId -- <statusId> <attachmentId>
    | SharePathPage String -- <path of photo to share on server>
    | ShareUploadPage (Maybe String) -- <data of the image loaded>



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


attachmentDecoder : Decoder Attachment
attachmentDecoder =
    succeed Attachment
        |> required "id" attachmentIdDecoder
        |> required "type" (string |> andThen attachmentTypeDecoder)
        |> required "url" string
        |> required "preview_url" string


attachmentIdDecoder : Decoder AttachmentId
attachmentIdDecoder =
    map (\s -> AttachmentId s) string


accountDecoder : Decoder Account
accountDecoder =
    succeed Account
        |> required "id" string
        |> required "acct" string
        |> required "display_name" string


statusDecoder : Decoder Status
statusDecoder =
    succeed Status
        |> required "id" statusIdDecoder
        |> optional "url" (nullable string) Nothing
        |> required "account" accountDecoder
        |> optional "content" (nullable string) Nothing
        |> required "media_attachments" (list attachmentDecoder)
        |> required "sensitive" bool



statusIdDecoder : Decoder StatusId
statusIdDecoder =
    map (\s -> StatusId s) string
