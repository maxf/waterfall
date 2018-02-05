module Update exposing (update, photoHashParts)

import Http
import Regex exposing (Regex, regex, find, HowMany(..))
import Maybe exposing (withDefault)
import Navigation exposing (Location, newUrl, modifyUrl)
import Model exposing (Model, changeServerUrl)
import Auth exposing (authenticate, storeAuthToken, clearAuthToken, checkAuthToken)
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

        AuthReturn (Err error) ->
            ( { model | message = Just ("auth error: " ++ httpErrorMessage error) }
            , Cmd.none
            )

        AuthReturn (Ok response) ->
            { model | authToken = Just response.token, message = Nothing }
                ! [ storeAuthToken response.token
                  , fetchCurrentUserDetails response.token model.server.url
                  , modifyUrl "#home"
                  ]

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

        TimelineFetched (Ok timeline) ->
            ( { model | timeline = List.filter (\s -> s.attachments /= []) timeline }
            , Cmd.none
            )

        TimelineFetched (Err e) ->
            ( { model | message = Just ("timeline error: " ++ httpErrorMessage e) }, Cmd.none )

        UserDetailsFetched (Err e) ->
            ( { model | message = Just ("account fetch error: " ++ httpErrorMessage e) }
            , Cmd.none
            )

        UserDetailsFetched (Ok account) ->
            let
                newModel =
                    { model | username = account.acct, userId = Just account.id }
            in
            ( newModel
            , prepareScreenToDisplay newModel
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

        AuthTokenRetrievedFromLocalStorage ( _, token ) ->
            case token of
                Nothing ->
                    ( model, modifyUrl "#login" )

                Just tokenValue ->
                    { model | authToken = token, password = "" }
                    ! [ fetchCurrentUserDetails tokenValue model.server.url ]



        ViewPhoto status attachment ->
            ( { model | screenShown = Photo status.id attachment.id }
            , newUrl
                ("#photo:"
                    ++ (statusIdToString status.id)
                    ++ ":"
                    ++ (attachmentIdToString attachment.id)
                )
            )

        Logout ->
            let
                newModel =
                    { model | authToken = Nothing }
                _ = Debug.log "Logging" "out"
            in
                newModel ! [ clearAuthToken, Debug.log "><" (modifyUrl "") ]

        UrlHasChanged location ->
            let
                newModel =
                    { model | screenShown = screenType location model }
                _ = Debug.log "type" (screenType location model)
            in
                ( newModel, prepareScreenToDisplay newModel )



-- URL change update model


screenType : Location -> Model -> Screen
screenType url model =
    if url.hash == "#login" then
        Login
    else if url.hash == "" || url.hash == "#" then
        PublicTimeline
    else if url.hash == "#home" then
        Home
    else if url.hash == "#me" then
        Profile
    else if String.startsWith "#user:" url.hash then
        User (String.dropLeft 6 url.hash)
    else if String.startsWith "#upload" url.hash then
        ShareUpload Nothing
    else if String.startsWith "#photo:" url.hash then
        case photoHashParts url.hash of
            Ok ( statusId, attachmentId ) ->
                Photo statusId attachmentId

            Err _ ->
                PublicTimeline
    else
        PublicTimeline



-- URL change generate command


prepareScreenToDisplay : Model -> Cmd Msg
prepareScreenToDisplay model =
    case model.screenShown of
        Login ->
            Cmd.none

        SharePath _ ->
            case model.authToken of
                Nothing ->
                    authenticate model

                _ ->
                    Cmd.none

        ShareUpload _ ->
            case model.authToken of
                Nothing ->
                    authenticate model

                _ ->
                    Cmd.none

        Photo statusId _ ->
            getStatus model.server.url model.authToken statusId

        Home ->
            case model.authToken of
                Nothing ->
                    checkAuthToken

                _ ->
                    getTimeline (Debug.log "1" model.server.url) model.authToken Home

        Profile ->
            case model.authToken of
                Nothing ->
                    checkAuthToken

                Just token ->
                    case model.userId of
                        Nothing ->
                            Cmd.none -- wait until callback arrives

                        Just id ->
                            getTimeline model.server.url model.authToken (User id)

        other ->
            getTimeline (Debug.log "2" model.server.url) model.authToken other



-- parse photo hash


photoUrlRegex : Regex
photoUrlRegex =
    regex "#photo:([^:]+):(.*)"


photoHashParts : String -> Result String ( StatusId, AttachmentId )
photoHashParts hash =
    let
        matches =
            find (AtMost 1) photoUrlRegex hash
    in
        case matches of
            [ match ] ->
                case match.submatches of
                    [ Just photoId, Just attachmentId ] ->
                        Ok ( StatusId photoId, AttachmentId attachmentId )

                    _ ->
                        Err "no photo URL parts matched"

            _ ->
                Err "no matches found in photo URL"



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-status


getStatus : String -> Maybe String -> StatusId -> Cmd Msg
getStatus instanceUrl authToken (StatusId statusId) =
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


fetchCurrentUserDetails : String -> String -> Cmd Msg
fetchCurrentUserDetails authToken instanceUrl =
    Http.send
        UserDetailsFetched
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
