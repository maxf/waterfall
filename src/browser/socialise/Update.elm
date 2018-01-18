module Update exposing (update)

import Http
import Maybe exposing (withDefault)
import Navigation exposing (Location, modifyUrl)
import Model exposing (Model, changeServerUrl)
import Auth exposing (authenticate, storeAuthToken, clearAuthToken)
import Ports exposing (fileSelected)
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
            ( model, uploadAttachment model )

        -- A media attachment was uploaded
        AttachmentUploaded (Ok attachment) ->
            ( model, postStatus model attachment )

        AttachmentUploaded (Err error) ->
            ( { model | message = Just ("Failed to upload image" ++ (httpErrorMessage error)) }
            , Cmd.none
            )

        -- A status was posted
        StatusPosted (Ok status) ->
            ( { model | message = Just "Status posted!" }, Cmd.none )

        StatusPosted (Err error) ->
            ( { model | message = Just ("Failed to post status:" ++ (httpErrorMessage error)) }
            , Cmd.none
            )

        -- The user has selected an image to upload
        ImageSelected ->
            ( model, fileSelected "file-upload" )

        ImageRead imageData ->
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

        UrlHasChanged location ->
            let
                newModel =
                    { model | screenShown = getScreenType location model }
            in
                ( newModel
                , case model.authToken of
                    Just _ ->
                        prepareScreenToDisplay newModel

                    Nothing ->
                        Cmd.none
                )

        Logout ->
            ( { model | authToken = Nothing }, clearAuthToken )


prepareScreenToDisplay : Model -> Cmd Msg
prepareScreenToDisplay model =
    case model.screenShown of
        SharePath _ ->
            Cmd.none

        ShareUpload _ ->
            Cmd.none

        _ ->
            getTimeline model.server.url model.authToken model.screenShown



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


uploadAttachment : Model -> Cmd Msg
uploadAttachment model =
    case model.screenShown of
        ShareUpload (Just imageData) ->
            let
                body =
                    Http.multipartBody
                        [ Http.stringPart "file" imageData
                        , Http.stringPart "description" "uploaded image"
                        ]

                token =
                    model.authToken |> Maybe.withDefault ""
            in
                Http.send
                    AttachmentUploaded
                    (Http.request
                        { method = "POST"
                        , headers = [ Http.header "Authorization" ("Bearer " ++ token) ]
                        , url = model.server.url ++ "/api/v1/media"
                        , body = body
                        , expect = Http.expectJson mediaAttachmentDecoder
                        , timeout = Nothing
                        , withCredentials = False
                        }
                    )

        _ ->
            Cmd.none



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#posting-a-new-status


postStatus : Model -> Attachment -> Cmd Msg
postStatus model attachment =
    let
        body =
            Http.stringBody
                "application/x-www-form-urlencoded"
                ("status="
                    ++ (Http.encodeUri model.shareText)
                    ++ "media_ids[]="
                    ++ attachment.id
                )

        token =
            model.authToken |> Maybe.withDefault ""
    in
        Http.send
            StatusPosted
            (Http.request
                { method = "POST"
                , headers = [ Http.header "Authorization" ("Bearer " ++ token) ]
                , url = model.server.url ++ "/api/v1/media"
                , body = body
                , expect = Http.expectJson statusDecoder
                , timeout = Nothing
                , withCredentials = False
                }
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


getScreenType : Location -> Model -> Screen
getScreenType url model =
    if url.hash == "#public" then
        PublicTimeline
    else if url.hash == "#me" then
        User (model.userId |> withDefault "")
    else if String.startsWith "#user:" url.hash then
        User (String.dropLeft 6 url.hash)
    else if String.startsWith "#upload" url.hash then
        ShareUpload Nothing
    else
        Home
