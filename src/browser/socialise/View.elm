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
            div [] [ a [ href (loginUrl model) ] [ text "Log in" ] ]

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
                , p [] [ a [ href (loginUrl model) ] [ text "Log in using mastodon" ] ]
                , p []
                    [ text "Or see some sample user pages: "
                    , a [ href "#user:maxf" ] [ text "@maxf" ]
                    , text " "
                    , a [ href "#user:Edent" ] [ text "@Edent" ]
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
                , viewTimeline model.timeline
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
                [ h1 [] [ "User " ++ (model.otherUsername |> withDefault "") |> text ]
                , viewTimeline model.timeline
                ]

        ProfilePage ->
            div []
                [ h1 [] [ text "Your pictures" ]
                , viewTimeline model.timeline
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


viewTimeline : List Status -> Html Msg
viewTimeline timeline =
    let
        timelineOnlyAttachments =
            List.filter (\s -> s.attachments /= []) timeline
    in
    div [ class "timeline" ]
        (List.map viewStatus timelineOnlyAttachments)


viewStatusContent : Maybe String -> Html Msg
viewStatusContent content =
    case content of
        Nothing ->
            div [] []

        Just html ->
            main_
                [ class "content" ]
                [ html |> stripTags |> text ]


viewStatus : Status -> Html Msg
viewStatus status =
    div [ class "status" ]
        [ div [] (List.map (viewAttachment status) status.attachments)
        , div
            [ class "account" ]
            [ a
                [ href ("#user:" ++ status.account.acct) ]
                [ text status.account.acct ]
            ]
        ]


viewAttachment : Status -> Attachment -> Html Msg
viewAttachment status attachment =
    case attachment.type_ of
        Unknown ->
            span [] []

        _ ->
            a
                [ href ("#photo:" ++ (status.id |> statusIdToString) ++ ":" ++ (attachment.id |> attachmentIdToString)) ]
                (if status.sensitive then
                    [ span [] [ text "Sensitive content" ] ]

                 else
                    [ img [ src attachment.previewUrl ] [] ]
                )


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
