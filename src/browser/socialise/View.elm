module View exposing (view)

--import Html.Attributes.Extra exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (on, onClick, onInput, onSubmit)
import Json.Decode exposing (succeed)
import Maybe exposing (withDefault)
import Model exposing (Model)
import Types exposing (..)
import Url


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
        [ div
            [ class "outer" ]
            [ div
                [ class "columns" ]
                [ viewSidebar model
                , div [ id "photos" ] [ viewMain model ]
                ]
            , message
            ]
        ]
    }


viewSidebar : Model -> Html Msg
viewSidebar model =
    div
        [ class "sidebar" ]
        [ h1 [] [ a [ href "/" ] [ text "Waterfall" ] ]
        , p [] [ model.server.url.host |> text ]
        , viewSidebarLinks model.username model.view
        ]


viewSidebarLinks : Maybe String -> Screen -> Html Msg
viewSidebarLinks username pageType =
    case username of
        Nothing ->
            case pageType of
                LoginPage ->
                    div [] []

                _ ->
                    div [] [ a [ href "#login" ] [ text "Log in" ] ]

        Just name ->
            div []
                [ div []
                    [ span [ class "username" ] [ text name ]
                    , span
                        [ onClick (Auth Logout), class "logout" ]
                        [ text "Log out" ]
                    ]
                , ul []
                    [ li [] [ a [ href "#home" ] [ text "Timeline" ] ]
                    , li [] [ a [ href "#public" ] [ text "Public photos" ] ]
                    , li [] [ a [ href "#me" ] [ text "My photos" ] ]
                    , li [] [ a [ href "#upload" ] [ text "Upload" ] ]
                    ]
                ]


viewMain : Model -> Html Msg
viewMain model =
    case model.view of
        LoginPage ->
            viewLogin

        PhotoPage _ attachmentId ->
            case ( model.currentStatus, attachmentId ) of
                ( Just status, photoId ) ->
                    viewPhoto status photoId

                _ ->
                    div [] []

        SharePathPage path ->
            case model.authToken of
                Nothing ->
                    div [] [ viewLogin ]

                _ ->
                    viewSharePath path

        ShareUploadPage Nothing ->
            case model.authToken of
                Nothing ->
                    div [] [ viewLogin ]

                _ ->
                    viewShareUpload

        ShareUploadPage (Just dataUrl) ->
            case model.authToken of
                Nothing ->
                    div [] [ viewLogin ]

                _ ->
                    viewShareUploaded dataUrl

        HomePage ->
            let
                title =
                    (model.username |> withDefault "") ++ "'s timeline"
            in
            div []
                [ h1 [] [ text title ]
                , viewTimeline model.timeline
                ]

        PublicTimeline ->
            div []
                [ h1 [] [ text "Public timeline" ]
                , viewTimeline model.timeline
                ]

        UserPage userId ->
            div []
                [ h1 [] [ "User" ++ userId |> text ]
                , viewTimeline model.timeline
                ]

        ProfilePage ->
            div []
                [ h1 [] [ text "Your pictures" ]
                , viewTimeline model.timeline
                ]

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


viewLogin : Html Msg
viewLogin =
    div []
        [ h1 [] [ text "Log in" ]
        , Html.form [ onSubmit (Auth AuthSubmit) ]
            [ label [ for "instanceUrl" ] [ text "Instance URL" ]
            , select
                [ onInput (Auth << ServerSelect) ]
                (List.map (\s -> option [ value (Url.toString s.url) ] [ text s.url.host ]) servers)
            ]
        , div []
            [ label [ for "user-email" ] [ text "Email address" ]
            , input
                [ type_ "text"
                , id "user-email"
                , onInput (Auth << UserEmail)
                ]
                []
            ]
        , div []
            [ label [ for "password" ] [ text "Password" ]
            , input
                [ type_ "password"
                , id "password"
                , onInput (Auth << Password)
                ]
                []
            ]
        , div []
            [ button [ onClick (Auth AuthSubmit) ] [ text "Log in" ] ]
        ]


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
                [ class "content"

                {--, innerHtml html --}
                ]
                [ text "here is the content" ]


viewStatus : Status -> Html Msg
viewStatus status =
    div [ class "status" ]
        [ div [] (List.map (viewAttachment status) status.attachments)
        , div
            [ class "account" ]
            [ a
                [ href ("#user:" ++ status.account.id) ]
                [ text status.account.acct ]
            ]
        ]


viewAttachment : Status -> Attachment -> Html Msg
viewAttachment status attachment =
    case attachment.type_ of
        Unknown ->
            span [] []

        _ ->
            span
                [ onClick (ViewPhoto status attachment) ]
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
