module Update exposing (update, photoHashParts, getTimeline)

import Http
import Json.Decode exposing (..)
import Regex exposing (Regex, regex, find, HowMany(..))
import Maybe exposing (withDefault)
import Navigation exposing (Location, newUrl, modifyUrl)
import Model exposing (Model, changeServerUrl)
import Auth exposing (authenticate, storeAuthToken, clearAuthToken)
import Ports exposing (..)
import Types exposing (..)


updateAuth : AuthMsg -> Model -> ( Model, Cmd Msg )
updateAuth msg model =
    case msg of
        UserEmail email ->
            ( { model | userEmail = Just email }, Cmd.none )

        Password password ->
            ( { model | password = Just password }, Cmd.none )

        ServerSelect url ->
            ( changeServerUrl model url, Cmd.none )

        AuthSubmit ->
            ( model, authenticate model )

        AuthReturn (Err error) ->
            ( { model
                | message =
                    Just ("auth error: " ++ httpErrorMessage error)
              }
            , Cmd.none
            )

        AuthReturn (Ok response) ->
            { model | authToken = Just response.token, message = Nothing }
                ! [ storeAuthToken response.token
                  , fetchCurrentUserDetails response.token model.server.url
                  ]

        UserDetailsFetched (Err e) ->
            ( { model
                | message =
                    Just ("account fetch error: " ++ httpErrorMessage e)
              }
            , Cmd.none
            )

        UserDetailsFetched (Ok account) ->
            let
                newModel =
                    { model
                        | username = Just account.acct
                        , userId = Just account.id
                    }
            in
                ( newModel
                , modifyUrl "#home"
                )

        AuthTokenRetrievedFromLocalStorage ( _, token ) ->
            case token of
                Nothing ->
                    ( model, newUrl "#login" )

                Just tokenValue ->
                    ( { model | authToken = token, password = Nothing }
                    , fetchCurrentUserDetails tokenValue model.server.url
                    )

        Logout ->
            { model
                | authToken = Nothing
                , userId = Nothing
                , userEmail = Nothing
                , username = Nothing
            }
                ! [ clearAuthToken, modifyUrl "#public" ]


updateShare : ShareMsg -> Model -> ( Model, Cmd Msg )
updateShare msg model =
    case msg of
        ShareTextInput text ->
            ( { model | shareText = text }, Cmd.none )

        ShareImage ->
            ( { model | message = Just "Uploading image" }
            , shareImage model
            )

        UploadImage ->
            ( { model | message = Just "Uploading image" }
            , uploadImage model
            )

        -- A status was posted
        StatusPosted Nothing ->
            ( { model | message = Nothing }, modifyUrl "#home" )

        StatusPosted (Just error) ->
            ( { model | message = Just error }, Cmd.none )

        -- The user has selected an image to upload
        ImageSelected ->
            ( model, getImageFromForm "file-upload" )

        FormImageRead imageData ->
            ( { model | view = ShareUploadPage (Just imageData.contents) }
            , Cmd.none
            )

        ImageShared (Err error) ->
            ( { model
                | message =
                    Just ("share error: " ++ httpErrorMessage error)
              }
            , Cmd.none
            )

        ImageShared (Ok _) ->
            ( { model | message = Nothing }, modifyUrl "#home" )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Auth authMsg ->
            updateAuth authMsg model

        Share shareMsg ->
            updateShare shareMsg model

        TimelineFetched (Ok timeline) ->
            ( { model
                | timeline =
                    List.filter (\s -> s.attachments /= []) timeline
              }
            , Cmd.none
            )

        TimelineFetched (Err e) ->
            ( { model
                | message =
                    Just ("timeline error: " ++ httpErrorMessage e)
              }
            , Cmd.none
            )

        PhotoFetched (Err e) ->
            ( { model
                | message =
                    Just ("timeline error: " ++ httpErrorMessage e)
              }
            , Cmd.none
            )

        PhotoFetched (Ok status) ->
            ( { model | currentStatus = Just status }
            , Cmd.none
            )

        CloseMessage ->
            ( { model | message = Nothing }, Cmd.none )

        ViewPhoto status attachment ->
            ( { model | view = PhotoPage status.id attachment.id }
            , newUrl
                ("#photo:"
                    ++ statusIdToString status.id
                    ++ ":"
                    ++ attachmentIdToString attachment.id
                )
            )

        UrlHasChanged location ->
            let
                newModel =
                    { model | view = screenType location }
            in
                ( newModel, prepareScreenToDisplay newModel )



-- URL change update model


screenType : Location -> Screen
screenType url =
    if url.hash == "" || url.hash == "#" then
        PublicTimeline
    else if url.hash == "#login" then
        LoginPage
    else if url.hash == "#home" then
        HomePage
    else if url.hash == "#me" then
        ProfilePage
    else if String.startsWith "#user:" url.hash then
        UserPage (String.dropLeft 6 url.hash)
    else if String.startsWith "#upload" url.hash then
        ShareUploadPage Nothing
    else if String.startsWith "#photo:" url.hash then
        case photoHashParts url.hash of
            Ok ( statusId, attachmentId ) ->
                PhotoPage statusId attachmentId

            Err _ ->
                PublicTimeline
    else
        PublicTimeline



-- URL change generate command


prepareScreenToDisplay : Model -> Cmd Msg
prepareScreenToDisplay model =
    case model.view of
        SharePathPage _ ->
            case model.authToken of
                Nothing ->
                    modifyUrl "#login"

                _ ->
                    Cmd.none

        ShareUploadPage _ ->
            case model.authToken of
                Nothing ->
                    modifyUrl "#login"

                _ ->
                    Cmd.none

        PhotoPage statusId _ ->
            getStatus model.server.url model.authToken statusId

        UserPage userId ->
            getUserPage model.server.url userId

        HomePage ->
            case model.authToken of
                Nothing ->
                    modifyUrl "#login"

                _ ->
                    getTimeline model.server.url model.authToken HomePage

        LoginPage ->
            Cmd.none

        ProfilePage ->
            case model.authToken of
                Nothing ->
                    modifyUrl "#login"

                Just _ ->
                    case model.userId of
                        Nothing ->
                            Cmd.none

                        Just _ ->
                            getTimeline
                                model.server.url
                                model.authToken
                                model.view

        other ->
            getTimeline model.server.url model.authToken other



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



-- No API call for getting a user's timeline.
-- https://github.com/tootsuite/mastodon/issues/6443
-- so we need to read from the user's atom feed

getUserPage : String -> String -> Cmd Msg
getUserPage serverUrl username =
    let
        feedUrl =
            serverUrl ++ "/users/" ++ username ++ ".atom"
        request =
            Http.get feedUrl decodeValue
    in
        Http.send
            decodeUserAtom
            request


-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines


getTimeline : String -> Maybe String -> Screen -> Cmd Msg
getTimeline instanceUrl authToken screenType =
    let
        urlPath =
            case screenType of
                PublicTimeline ->
                    "/api/v1/timelines/public"

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
        (Auth << UserDetailsFetched)
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
            case model.view of
                SharePathPage path ->
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
        Http.send (Share << ImageShared) request
