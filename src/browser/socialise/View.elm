module View exposing (view)

import Auth exposing (loginUrl)
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (on, onClick, onInput)
import Json.Decode exposing (succeed)
import Maybe exposing (withDefault)
import Model exposing (Model, baseUrl)
import Regex
import Types exposing (..)


view : Model -> Browser.Document Msg
view model =
    let
        message =
            case model.message of
                Nothing ->
                    div [] []

                Just messageText ->
                    div
                        [ class "error", onClick CloseMessage ]
                        [ messageText |> text ]
    in
    { title = "Waterfall"
    , body =
        [ if model.view /= StartingPage then
            div
                [ class "outer" ]
                [ div
                    [ class "columns" ]
                    [ viewSidebar model
                    , div [ id "photos" ] [ viewMain model ]
                    ]
                , message
                ]

          else
            div [] []
        ]
    }


viewSidebar : Model -> Html Msg
viewSidebar model =
    div
        [ class "sidebar" ]
        [ div
            [ class "logo" ]
            [ a [ href (baseUrl model) ] [ text "Waterfall" ]
            , br [] []
            , span [ class "server" ] [ text model.server.url.host ]
            ]
        , viewSidebarLinks model
        ]


viewSidebarLinks : Model -> Html Msg
viewSidebarLinks model =
    case model.username of
        Nothing ->
            div [ class "button", onClick UserClickedLogin ] [ text "Log in" ]

        Just name ->
            div []
                [ div []
                    [ img [ class "avatar", src (model.userAvatar |> Maybe.withDefault "") ] []
                    , span [ class "username" ] [ text name ]
                    , a
                        [ href "#logout", class "logout" ]
                        [ text "Log out" ]
                    ]
                , ul []
                    [ li [] [ a [ href (baseUrl model) ] [ text "Home" ] ]
                    , li [] [ a [ href "#public" ] [ text "Public photos" ] ]
                    , li [] [ a [ href ("#user:" ++ name) ] [ text "My photos" ] ]
                    , li [] [ a [ href "#upload" ] [ text "Upload" ] ]
                    ]
                ]


viewMain : Model -> Html Msg
viewMain model =
    case model.view of
        LoginPage ->
            div []
                [ h1 [] [ text "Welcome to Waterfall" ]
                , p []
                    [ text "See some sample user pages: "
                    , a [ class "user", href "#user:maxf" ] [ text "@maxf" ]
                    , text " "
                    , a [ class "user", href "#user:Edent" ] [ text "@Edent" ]
                    , text " "
                    ]
                ]

        PhotoPage _ attachmentId ->
            case ( model.currentStatus, attachmentId ) of
                ( Just status, photoId ) ->
                    viewPhoto status photoId

                _ ->
                    div [] []

        SharePathPage path ->
            case model.authToken of
                Nothing ->
                    div [] []

                _ ->
                    viewSharePath path

        ShareUploadPage Nothing ->
            case model.authToken of
                Nothing ->
                    div [] []

                _ ->
                    viewShareUpload

        ShareUploadPage (Just dataUrl) ->
            case model.authToken of
                Nothing ->
                    div [] []

                _ ->
                    viewShareUploaded dataUrl

        HomePage ->
            let
                title =
                    (model.username |> withDefault "") ++ "'s home"
            in
            div []
                [ h1 [] [ text title ]
                , viewTimeline model.timeline model.view
                ]

        ErrorPage message ->
            div []
                [ h1 [] [ text "Error" ]
                , p [] [ text message ]
                ]

        LogoutPage ->
            div []
                [ h1 [] [ text "You have logged out" ] ]

        UserPage userId ->
            div []
                [ h1 [] [ ("@" ++ (model.otherUsername |> withDefault "")) ++ "'s pictures" |> text ]
                , viewTimeline model.timeline model.view
                ]

        ProfilePage ->
            div []
                [ h1 [] [ text "Your pictures" ]
                , viewTimeline model.timeline model.view
                ]

        StartingPage ->
            div [] []


attachmentMarkup : Attachment -> Html Msg
attachmentMarkup image =
    case image.type_ of
        Image ->
            img [ class "photo", src image.url ] []

        Video ->
            video [] [ source [ src image.url ] [] ]

        Gifv ->
            video [] [ source [ src image.url ] [] ]

        _ ->
            span [] [ text "Can't show this content" ]


viewPhoto : Status -> AttachmentId -> Html Msg
viewPhoto status attachmentId =
    let
        attachment : List Attachment
        attachment =
            List.filter
                (\a -> a.id == attachmentId)
                status.attachments
    in
    case attachment of
        [ image ] ->
            let
                markup =
                    if status.sensitive then
                        div [] [ text "Sensitive content" ]

                    else
                        attachmentMarkup image
            in
            div [ class "lightbox" ]
                [ div [ class "lightbox-inner" ]
                    [ markup
                    , viewStatusContent status.content
                    ]
                ]

        _ ->
            div [] []


viewTimeline : List Status -> Screen -> Html Msg
viewTimeline timeline pageType =
    let
        timelineOnlyAttachments =
            List.filter (\s -> s.attachments /= []) timeline
    in
    div [ class "timeline" ]
        (List.map (viewStatus pageType) timelineOnlyAttachments)


viewStatusContent : Maybe String -> Html Msg
viewStatusContent content =
    case content of
        Nothing ->
            div [] []

        Just html ->
            main_
                [ class "content" ]
                [ html |> stripTags |> text ]


statusCaption : Screen -> Status -> Html Msg
statusCaption pageType status =
    let
        userInfo =
            if pageType == HomePage then
                a [ class "user", href ("#user:" ++ status.account.acct) ]
                    [ text ("@" ++ status.account.acct) ]
            else
                text ""

        albumInfo =
            if List.length status.attachments > 1 then
                span [] [ text <| String.fromInt (List.length status.attachments) ++ " photos" ]
            else
                span [] []
    in
    div [ class "account" ]
        [
         userInfo
        , albumInfo
        ]


viewStatus : Screen -> Status -> Html Msg
viewStatus pageType status =
    div [ class "status" ]
        [ div [] [ viewAttachments status ]
        , statusCaption pageType status
        ]


viewAttachments : Status -> Html Msg
viewAttachments status =
    if status.sensitive then
        span [] [ text "Sensitive content" ]

    else
        let
            firstAttachment =
                List.head status.attachments
        in
        case firstAttachment of
            Nothing ->
                div [] []

            Just attachment ->
                viewAttachment status.id attachment


viewAttachment : StatusId -> Attachment -> Html Msg
viewAttachment statusId attachment =
    case attachment.type_ of
        Unknown ->
            span [] []

        _ ->
            let
                attachmentHref =
                    "#photo:"
                        ++ (statusId |> statusIdToString)
                        ++ ":"
                        ++ (attachment.id |> attachmentIdToString)
            in
            a
                [ href attachmentHref ]
                [ img [ src attachment.previewUrl ] [] ]


viewSharePath : String -> Html Msg
viewSharePath path =
    div [ class "share" ]
        [ h1 [] [ text "Share photo" ]
        , img [ src ("/thumb?photo=" ++ path) ] []
        , br [] []
        , input
            [ type_ "text"
            , onInput (Share << ShareTextInput)
            , placeholder "title"
            ]
            []
        , br [] []
        , button [ onClick (Share ShareImage) ] [ text "Share" ]
        ]


viewShareUpload : Html Msg
viewShareUpload =
    div [ class "share" ]
        [ h1 [] [ text "Select photo" ]
        , input
            [ type_ "file"
            , id "file-upload"
            , on "change" (succeed (Share ImageSelected))
            ]
            []
        ]


viewShareUploaded : String -> Html Msg
viewShareUploaded dataUrl =
    div [ class "share" ]
        [ h1 [] [ text "Upload photo" ]
        , img [ id "file-upload", src dataUrl ] []
        , br [] []
        , input
            [ type_ "text"
            , onInput (Share << ShareTextInput)
            , placeholder "title"
            ]
            []
        , br [] []
        , button [ onClick (Share UploadImage) ] [ text "Share" ]
        ]


htmlTagRegex : Maybe Regex.Regex
htmlTagRegex =
    Regex.fromString "<\\/?[^>]+>"


stripTags : String -> String
stripTags string =
    case htmlTagRegex of
        Nothing ->
            string
                |> Debug.log "Error, not a regex"

        Just regex ->
            string
                |> Regex.replace regex (always "")
