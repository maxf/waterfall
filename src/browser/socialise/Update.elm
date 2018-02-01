module Update exposing (update)

import Http
import Regex exposing (Regex, regex, find, HowMany(..))
import Maybe exposing (withDefault)
import Navigation exposing (Location, newUrl, modifyUrl)
import Model exposing (Model, changeServerUrl)
import Auth exposing (authenticate, storeAuthToken, clearAuthToken)
import Ports exposing (..)
import Types exposing (..)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Username username ->
            ( { model | username = username }, Cmd.none )

        Password password ->
            ( { model | password = password }, Cmd.none )

        ServerSelect url ->
            ( changeServerUrl model url, Cmd.none )

        AuthSubmit ->
            ( model, authenticate model )

        AuthReturn (Ok response) ->
            { model | authToken = Just response.token, message = Nothing }
                ! [ storeAuthToken response.token, getUser response.token model.server.url ]

        ShareTextInput text ->
            ( { model | shareText = text }, Cmd.none )

        ShareImage ->
            ( model, shareImage model )

        UploadImage ->
            ( model, uploadImage model )

        -- A status was posted
        StatusPosted Nothing ->
            ( model, modifyUrl "#home" )

        StatusPosted (Just error) ->
            ( { model | message = Just error }, Cmd.none )

        -- The user has selected an image to upload
        ImageSelected ->
            ( model, getImageFromForm "file-upload" )

        FormImageRead imageData ->
            ( { model | screenShown = ShareUpload (Just imageData.contents) }
            , Cmd.none
            )

        ImageShared (Err error) ->
            ( { model | message = Just ("share error: " ++ httpErrorMessage error) }
            , Cmd.none
            )

        ImageShared (Ok _) ->
            ( model, modifyUrl "#home" )

        AuthReturn (Err error) ->
            ( { model | message = Just ("auth error: " ++ httpErrorMessage error) }, Cmd.none )

        TimelineFetched (Ok timeline) ->
            ( { model | timeline = List.filter (\s -> s.mediaAttachments /= []) timeline }
            , Cmd.none
            )

        TimelineFetched (Err e) ->
            ( { model | message = Just ("timeline error: " ++ httpErrorMessage e) }, Cmd.none )

        UserFetched (Err e) ->
            ( { model | message = Just ("account fetch error: " ++ httpErrorMessage e) }
            , Cmd.none
            )

        UserFetched (Ok account) ->
            ( { model | username = account.acct, userId = Just account.id }
            , prepareScreenToDisplay model
            )

        PhotoFetched (Err e) ->
            ( { model | message = Just ("timeline error: " ++ httpErrorMessage e) }
            , Cmd.none
            )

        PhotoFetched (Ok status) ->
            ( { model | currentStatus = Just status }
            , Cmd.none
            )

        CloseMessage ->
            ( { model | message = Nothing }, Cmd.none )

        AuthTokenRetrieved ( _, token ) ->
            case token of
                Nothing ->
                    ( model, Cmd.none )

                Just tokenValue ->
                    ( { model | authToken = token, password = "" }
                    , getUser tokenValue model.server.url
                    )

        ViewPhoto status attachment ->
            ( { model | screenShown = Photo status.id attachment.id }
            , newUrl ("#photo:" ++ status.id ++ ":" ++ attachment.id)
            )

        Logout ->
            ( { model | authToken = Nothing }, clearAuthToken )

        UrlHasChanged location ->
            ( { model | screenShown = screenType location model }
            , prepareScreenToDisplay model
            )



-- URL change update model


screenType : Location -> Model -> Screen
screenType url model =
    if url.hash == "#public" then
        PublicTimeline
    else if url.hash == "#me" then
        User (model.userId |> withDefault "")
    else if String.startsWith "#user:" url.hash then
        User (String.dropLeft 6 url.hash)
    else if String.startsWith "#upload" url.hash then
        ShareUpload Nothing
    else if String.startsWith "#photo" url.hash then
        case photoHashParts url.hash of
            Ok ( statusId, attachmentId ) ->
                Photo statusId attachmentId

            Err _ ->
                Home
    else
        Home



-- URL change generate command


prepareScreenToDisplay : Model -> Cmd Msg
prepareScreenToDisplay model =
    case model.screenShown of
        SharePath _ ->
            Cmd.none

        ShareUpload _ ->
            Cmd.none

        Photo statusId _ ->
            getStatus model.server.url model.authToken statusId

        _ ->
            getTimeline model.server.url model.authToken model.screenShown



-- parse photo hash


photoUrlRegex : Regex
photoUrlRegex =
    regex "#photo:([^:]+):(.*)"


photoHashParts : String -> Result String ( String, String )
photoHashParts hash =
    let
        matches =
            find (AtMost 1) photoUrlRegex hash
    in
        case matches of
            [ match ] ->
                case match.submatches of
                    [ Just photoId, Just attachmentId ] ->
                        Ok ( photoId, attachmentId )

                    _ ->
                        Err "no photo URL parts matched"

            _ ->
                Err "no matches found in photo URL"



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-status


getStatus : String -> Maybe String -> String -> Cmd Msg
getStatus instanceUrl authToken statusId =
    let
        headers =
            case authToken of
                Nothing ->
                    []

                Just token ->
                    [ Http.header "Authorization" ("Bearer " ++ token) ]

        request =
            Http.request
                { method = "GET"
                , headers = headers
                , url = instanceUrl ++ "/api/v1/statuses/" ++ statusId
                , body = Http.emptyBody
                , expect = Http.expectJson statusDecoder
                , timeout = Nothing
                , withCredentials = False
                }
    in
        Http.send PhotoFetched request



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines


getTimeline : String -> Maybe String -> Screen -> Cmd Msg
getTimeline instanceUrl authToken screenType =
    let
        urlPath =
            case screenType of
                PublicTimeline ->
                    "/api/v1/timelines/public"

                User id ->
                    "/api/v1/accounts/" ++ Http.encodeUri id ++ "/statuses"

                _ ->
                    "/api/v1/timelines/home"

        headers =
            case authToken of
                Nothing ->
                    []

                Just token ->
                    [ Http.header "Authorization" ("Bearer " ++ token) ]

        request =
            Http.request
                { method = "GET"
                , headers = headers
                , url = instanceUrl ++ urlPath ++ "?limit=40"
                , body = Http.emptyBody
                , expect = Http.expectJson timelineDecoder
                , timeout = Nothing
                , withCredentials = False
                }
    in
        Http.send TimelineFetched request


httpErrorMessage : Http.Error -> String
httpErrorMessage error =
    case error of
        Http.BadUrl string ->
            "Bad URL: " ++ string

        Http.Timeout ->
            "Timeout"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus response ->
            toString response.status.code
                ++ " ("
                ++ response.status.message
                ++ ") - "
                ++ response.body

        Http.BadPayload text _ ->
            "Bad payload: " ++ text


getUser : String -> String -> Cmd Msg
getUser authToken instanceUrl =
    Http.send
        UserFetched
        (Http.request
            { method = "GET"
            , headers = [ Http.header "Authorization" ("Bearer " ++ authToken) ]
            , url = instanceUrl ++ "/api/v1/accounts/verify_credentials"
            , body = Http.emptyBody
            , expect = Http.expectJson accountDecoder
            , timeout = Nothing
            , withCredentials = False
            }
        )


uploadImage : Model -> Cmd Msg
uploadImage model =
    fileUpload
        ( "file-upload"
        , model.server.url
        , model.authToken |> Maybe.withDefault ""
        , model.shareText
        )


shareImage : Model -> Cmd Msg
shareImage model =
    let
        imagePath =
            case model.screenShown of
                SharePath path ->
                    path

                _ ->
                    ""

        body =
            Http.stringBody
                "application/x-www-form-urlencoded"
                ("apiurl="
                    ++ model.server.url
                    ++ "&text="
                    ++ model.shareText
                    ++ "&token="
                    ++ (model.authToken |> withDefault "")
                    ++ "&path="
                    ++ imagePath
                )

        request =
            Http.request
                { method = "POST"
                , headers = []
                , url = "/share"
                , body = body
                , expect = Http.expectString
                , timeout = Nothing
                , withCredentials = False
                }
    in
        Http.send ImageShared request
