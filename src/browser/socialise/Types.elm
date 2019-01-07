module Types exposing (Account, Attachment, AttachmentId(..), AttachmentType(..), AuthMsg(..), AuthResponse, ImagePortData, MastodonServer, Msg(..), Screen(..), ShareMsg(..), Status, StatusId(..), accountDecoder, attachmentDecoder, attachmentIdDecoder, attachmentIdToString, attachmentTypeDecoder, defaultServer, lookupServer, servers, screenType, statusDecoder, statusIdDecoder, statusIdToString, timelineDecoder)

import Browser
import Browser.Navigation as Nav
import Http
import Json.Decode exposing (..)
import Json.Decode.Pipeline exposing (..)
import Regex exposing (Regex, find, fromString)
import Url exposing (..)


type AuthMsg
    = ServerSelect String
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
    | UserClickedLogin


type alias AuthResponse =
    { token : String }


type alias MastodonServer =
    { url : Url
    , clientId : String
    , clientSecret : String
    }


type alias ImagePortData =
    { contents : String
    , filename : String
    }


defaultServer : MastodonServer
defaultServer =
    { url = Url Https "mastodon.social" Nothing "" Nothing Nothing
    , clientId = "9a2d034cf1397da34c9ce5b9103560749efed1962208e875b28cf126914da95d"
    , clientSecret = "5ab52772ae48cdf47ad2ffc4bb651de8d15f590b9a3888c887c56478043de061"
    }


servers : List MastodonServer
servers =
    [ defaultServer
    , MastodonServer
        (Url Https "pawoo.net" Nothing "" Nothing Nothing)
        "e0becd2b4d162124a074e168908f83cec9f2d83bdbd141c3da5884ce60804045"
        "invalid"
    ]


lookupServer : String -> Maybe MastodonServer
lookupServer url =
    List.head (List.filter (\s -> toString s.url == url) servers)



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
    | ProfilePage
    | PublicTimeline
    | UserPage String -- <user id>
    | PhotoPage StatusId AttachmentId -- <statusId> <attachmentId>
    | SharePathPage String -- <path of photo to share on server>
    | ShareUploadPage (Maybe String) -- <data of the image loaded>
    | LoginPage



-- URL change update model

photoUrlRegex : Regex
photoUrlRegex =
    Regex.fromString "photo:([^:]+):(.*)"
        |> Maybe.withDefault Regex.never


photoHashParts : String -> Result String ( StatusId, AttachmentId )
photoHashParts hash =
    case find photoUrlRegex hash of
        [ match ] ->
            case match.submatches of
                [ Just photoId, Just attachmentId ] ->
                    Ok ( StatusId photoId, AttachmentId attachmentId )

                _ ->
                    Err "no photo URL parts matched"

        _ ->
            Err "no matches found in photo URL"



screenType : Url -> Screen
screenType url =
    case url.fragment of
        Nothing ->
            PublicTimeline

        Just "home" ->
            HomePage

        Just "me" ->
            ProfilePage

        Just fragment ->
            if String.startsWith "user:" fragment then
                UserPage (String.dropLeft 5 fragment)

            else if String.startsWith "upload" fragment then
                ShareUploadPage Nothing

            else if String.startsWith "photo:" fragment then
                case photoHashParts fragment of
                    Ok ( statusId, attachmentId ) ->
                        PhotoPage statusId attachmentId

                    Err _ ->
                        PublicTimeline

            else
                PublicTimeline


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
