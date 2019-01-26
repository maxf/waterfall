module Update exposing (fetchCurrentUserDetails, fetchOtherUserId, fragmentRouter, getStatus, getTimeline, update)

import Auth exposing (authenticate, clearAuthToken, loginUrl, storeAuthToken)
import Browser
import Browser.Navigation as Nav
import Http
import Maybe exposing (withDefault)
import Model exposing (Model, baseUrl, changeServerUrl, initialModel)
import Ports exposing (..)
import String exposing (fromInt, startsWith)
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
            ( model
            , Cmd.batch
                [ storeAuthToken response.token
                , Nav.load (baseUrl model)
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
                        , userAvatar = Just account.avatarUrl
                    }
            in
            fragmentRouter newModel

        -- After loading the page, the auth token was requested from local storage
        AuthTokenRetrievedFromLocalStorage ( _, token ) ->
            case token of
                Nothing ->
                    fragmentRouter model

                -- We've got a token, fetch the user's details
                Just tokenValue ->
                    ( { model | authToken = token }
                    , fetchCurrentUserDetails tokenValue model.server.url
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
            ( { model | message = Nothing }, goToHomePage model )

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
            ( { model | message = Nothing }, goToHomePage model )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        -- Authentication messages
        Auth authMsg ->
            updateAuth authMsg model

        -- Share messages
        Share shareMsg ->
            updateShare shareMsg model

        -- Other messages
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
                    { model | currentUrl = location }
            in
            case location.fragment of
                Nothing ->
                    case model.authToken of
                        Nothing ->
                            ( { newModel | view = LoginPage }
                            , Cmd.none
                            )

                        Just _ ->
                            ( { newModel | view = HomePage }
                            , getTimeline model.server.url model.authToken HomePage
                            )

                Just "logout" ->
                    let
                        startModel =
                            initialModel model.key model.currentUrl
                    in
                    ( { startModel | view = LoginPage }
                    , Cmd.batch
                        [ clearAuthToken
                        , Nav.pushUrl model.key (baseUrl model)
                        ]
                    )

                Just _ ->
                    fragmentRouter newModel

        LinkWasClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    ( model, Nav.pushUrl model.key (Url.toString url) )

                Browser.External href ->
                    ( model, Nav.load href )

        UserClickedLogin ->
            ( model, Nav.load (loginUrl model) )

        ReceivedOtherUserId (Ok userId) ->
            case userId of
                Nothing ->
                    ( { model | view = ErrorPage "User not found" }
                    , Cmd.none
                    )

                Just id ->
                    ( { model | view = UserPage id, otherUserId = Just id }
                    , getTimeline model.server.url model.authToken (UserPage id)
                    )

        ReceivedOtherUserId (Err message) ->
            ( { model | view = ErrorPage (httpErrorMessage message) }
            , Cmd.none
            )


goToHomePage : Model -> Cmd Msg
goToHomePage model =
    Nav.replaceUrl model.key (baseUrl model)



-- URL change generate command


fragmentRouter : Model -> ( Model, Cmd Msg )
fragmentRouter model =
    case model.currentUrl.fragment of
        Nothing ->
            case model.authToken of
                Nothing ->
                    ( { model | view = LoginPage }
                    , Cmd.none
                    )
                Just _ ->
                    ( { model | view = HomePage }
                    , getTimeline model.server.url model.authToken HomePage
                    )

        Just "logout" ->
            ( { model | view = LoginPage }, clearAuthToken )

        Just frag ->
            if frag |> startsWith "user:" then
                let
                    acct =
                        String.dropLeft 5 frag
                in
                ( { model | otherUsername = Just acct, view = UserPage acct }
                , fetchOtherUserId model.server.url acct
                )

            else if frag |> startsWith "photo:" then
                case photoHashParts frag of
                    Ok ( statusId, attachmentId ) ->
                        ( { model | view = PhotoPage statusId attachmentId }
                        , getStatus model.server.url model.authToken statusId
                        )

                    Err message ->
                        ( { model | view = ErrorPage message }
                        , Cmd.none
                        )

            else
                ( model, Cmd.none )


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



fetchOtherUserId : Url -> String -> Cmd Msg
fetchOtherUserId instanceUrl acct =
    let
        url =
            { instanceUrl
                | path = "/.well-known/webfinger"
                , query = Just ("resource=acct:" ++ acct ++ "@" ++ instanceUrl.host)
            }
    in
    Http.get
        { url = url |> toString
        , expect = Http.expectJson ReceivedOtherUserId webFingerDecoder
        }





getTimeline : Url -> Maybe String -> Screen -> Cmd Msg
getTimeline instanceUrl authToken pageType =
    let
        urlPath =
            case pageType of
                UserPage userId ->
                    "/api/v1/accounts/" ++ userId ++ "/statuses"

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
