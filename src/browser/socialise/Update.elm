module Update exposing (getStatus, getTimeline, photoHashParts, update, fetchCurrentUserDetails)

import Auth exposing (authenticate, clearAuthToken, storeAuthToken)
import Browser
import Browser.Navigation as Nav
import Http
import Maybe exposing (withDefault)
import Model exposing (Model, changeServerUrl)
import Ports exposing (..)
import Regex exposing (Regex, find, fromString)
import String exposing (fromInt)
import Types exposing (..)
import Url exposing (..)


updateAuth : AuthMsg -> Model -> ( Model, Cmd Msg )
updateAuth msg model =
    case msg of
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
            ( { model | authToken = Just response.token, message = Nothing }
            , Cmd.batch
                [ storeAuthToken response.token
                , fetchCurrentUserDetails response.token model.server.url
                ]
            )

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
            , Nav.replaceUrl model.key "#home"
            )

        AuthTokenRetrievedFromLocalStorage ( _, token ) ->
            case token of
                Nothing ->
                    let
                        newModel =
                            { model | view = PublicTimeline }
                    in
                    ( newModel, nextCommand newModel )

                Just tokenValue ->
                    ( { model | authToken = token, password = Nothing }
                    , fetchCurrentUserDetails tokenValue model.server.url
                    )

        Logout ->
            ( { model
                | authToken = Nothing
                , userId = Nothing
                , userEmail = Nothing
                , username = Nothing
              }
            , Cmd.batch [ clearAuthToken, Nav.replaceUrl model.key "#public" ]
            )


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
            ( { model | message = Nothing }, Nav.replaceUrl model.key "#home" )

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
            ( { model | message = Nothing }, Nav.replaceUrl model.key "#home" )


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
            , Nav.pushUrl
                model.key
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
            ( newModel, nextCommand newModel )

        LinkWasClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UserClickedLogin ->
            let
                serverUrl =
                    model.server.url

                redirectUrl =
                    model.baseUrl |> toString

                query =
                    "response_type=code&client_id=" ++ model.server.clientId ++ "&redirect_uri=" ++ redirectUrl ++ "&scope=read+write+follow+push&state=meh"
            -- https://authorization-server.com/auth?response_type=code&client_id=CLIENT_ID&redirect_uri=REDIRECT_URI&scope=photos&state=1234zyx

                url =
                    { serverUrl
                        | path = "/oauth/authorize"
                        , query = Just query
                    }

            in
                (model, Nav.load (Debug.log ">>" (url |> toString)))


-- URL change update model


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



-- URL change generate command


nextCommand : Model -> Cmd Msg
nextCommand model =
    case model.view of
        SharePathPage _ ->
            case model.authToken of
                Nothing ->
                    Nav.replaceUrl model.key "#login"

                _ ->
                    Cmd.none

        ShareUploadPage _ ->
            case model.authToken of
                Nothing ->
                    Nav.replaceUrl model.key "#login"

                _ ->
                    Cmd.none

        PhotoPage statusId _ ->
            getStatus model.server.url model.authToken statusId

        HomePage ->
            case model.authToken of
                Nothing ->
                    Nav.replaceUrl model.key "#login"

                _ ->
                    getTimeline model.server.url model.authToken HomePage

        ProfilePage ->
            case model.authToken of
                Nothing ->
                    Nav.replaceUrl model.key "#login"

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



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#fetching-a-status


getStatus : Url -> Maybe String -> StatusId -> Cmd Msg
getStatus instanceUrl authToken (StatusId statusId) =
    let
        headers =
            case authToken of
                Nothing ->
                    []

                Just token ->
                    [ Http.header "Authorization" ("Bearer " ++ token) ]
    in
    Http.request
        { method = "GET"
        , headers = headers
        , url = { instanceUrl | path = "/api/v1/statuses/" ++ statusId } |> toString
        , body = Http.emptyBody
        , expect = Http.expectJson PhotoFetched statusDecoder
        , timeout = Nothing
        , tracker = Nothing
        }



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines


getTimeline : Url -> Maybe String -> Screen -> Cmd Msg
getTimeline instanceUrl authToken pageType =
    let
        urlPath =
            case pageType of
                PublicTimeline ->
                    "/api/v1/timelines/public"

                UserPage id ->
                    "/api/v1/accounts/" ++ id ++ "/statuses"

                _ ->
                    "/api/v1/timelines/home"

        url =
            { instanceUrl | path = urlPath, query = Just "limit=40&local=true" }

        headers =
            case authToken of
                Nothing ->
                    []

                Just token ->
                    [ Http.header "Authorization" ("Bearer " ++ token) ]
    in
    Http.request
        { method = "GET"
        , headers = headers
        , url = url |> toString
        , body = Http.emptyBody
        , expect = Http.expectJson TimelineFetched timelineDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


httpErrorMessage : Http.Error -> String
httpErrorMessage error =
    case error of
        Http.BadUrl string ->
            "Bad URL: " ++ string

        Http.Timeout ->
            "Timeout"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus code ->
            "Bad status: " ++ fromInt code

        Http.BadBody text ->
            "Bad payload: " ++ text

fetchCurrentUserDetails : String -> Url -> Cmd Msg
fetchCurrentUserDetails authToken instanceUrl =
    Http.request
        { method = "GET"
        , headers = [ Http.header "Authorization" ("Bearer " ++ authToken) ]
        , url = { instanceUrl | path = "/api/v1/accounts/verify_credentials" } |> toString
        , body = Http.emptyBody
        , expect = Http.expectJson (Auth << UserDetailsFetched) accountDecoder
        , timeout = Nothing
        , tracker = Nothing
        }


uploadImage : Model -> Cmd Msg
uploadImage model =
    fileUpload
        { inputElementId = "file-upload"
        , serverUrl = model.server.url |> toString
        , authToken = model.authToken |> Maybe.withDefault ""
        , text = model.shareText
        }


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
                    ++ toString model.server.url
                    ++ "&text="
                    ++ model.shareText
                    ++ "&token="
                    ++ (model.authToken |> withDefault "")
                    ++ "&path="
                    ++ imagePath
                )
    in
    Http.request
        { method = "POST"
        , headers = []
        , url = "/share"
        , body = body
        , expect = Http.expectString (Share << ImageShared)
        , timeout = Nothing
        , tracker = Nothing
        }
