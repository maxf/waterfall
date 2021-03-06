module Types exposing (Account, Attachment, AttachmentId(..), AttachmentType(..), AuthMsg(..), AuthResponse, Fragment, ImagePortData, MastodonServer, Msg(..), Screen(..), ShareMsg(..), Status, StatusId(..), accountDecoder, attachmentDecoder, attachmentIdDecoder, attachmentIdToString, attachmentTypeDecoder, defaultServer, lookupServer, photoHashParts, screenType, servers, statusDecoder, statusIdDecoder, statusIdToString, timelineDecoder, webFingerDecoder)

import Browser
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
    | StatusFetched (Result Http.Error Status)
    | CloseMessage
    | ViewStatus Status
    | UrlHasChanged Url
    | LinkWasClicked Browser.UrlRequest
    | UserClickedLogin
    | ReceivedOtherUserId (Result Http.Error (Maybe String))


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


type alias Fragment =
    Maybe String


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


type alias Account =
    { id : String -- The ID of the account
    , acct : String -- username, includes @domain for remote users
    , displayName : String -- The account's display name
    , avatarUrl : String
    }


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
    , sensitive : Bool
    , favouritesCount : Int
    , reblogsCount : Int
    }


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


type Screen
    = StartingPage
    | HomePage
    | ProfilePage
    | UserPage String -- <user id>
    | StatusPage StatusId
    | PublicTimeline
    | SharePathPage String -- <path of photo to share on server>
    | ShareUploadPage (Maybe String) -- <data of the image loaded>
    | LoginPage
    | LogoutPage
    | ErrorPage String -- Error page with message


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
            HomePage

        Just "me" ->
            ProfilePage

        Just "logout" ->
            LogoutPage

        Just fragment ->
            if String.startsWith "user:" fragment then
                UserPage (String.dropLeft 5 fragment)

            else if String.startsWith "upload" fragment then
                ShareUploadPage Nothing

            else
                HomePage


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
        |> required "avatar_static" string


statusDecoder : Decoder Status
statusDecoder =
    succeed Status
        |> required "id" statusIdDecoder
        |> optional "url" (nullable string) Nothing
        |> required "account" accountDecoder
        |> optional "content" (nullable string) Nothing
        |> required "media_attachments" (list attachmentDecoder)
        |> required "sensitive" bool
        |> required "favourites_count" int
        |> required "reblogs_count" int

type alias WebFingerRel =
    { rel : String
    , href : String
    }


webFingerRelDecoder : Json.Decode.Decoder WebFingerRel
webFingerRelDecoder =
    Json.Decode.succeed WebFingerRel
        |> required "rel" string
        |> optional "href" string ""


userIdFromSalmonUrl : String -> String
userIdFromSalmonUrl url =
    String.split "/" url
        |> List.reverse
        |> List.head
        |> Maybe.withDefault ""


userIdFromWebFinger : List WebFingerRel -> Maybe String
userIdFromWebFinger list =
    list
        |> List.filter (\item -> item.rel == "salmon")
        |> List.head
        |> Maybe.map .href
        |> Maybe.map userIdFromSalmonUrl


webFingerDecoder : Decoder (Maybe String)
webFingerDecoder =
    map userIdFromWebFinger (field "links" (list webFingerRelDecoder))


statusIdDecoder : Decoder StatusId
statusIdDecoder =
    map (\s -> StatusId s) string
