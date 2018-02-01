module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.Extra exposing (..)
import Html.Events exposing (onInput, onClick, onSubmit, on)
import Json.Decode exposing (succeed)
import Types exposing (Msg(..), Status, Attachment, AttachmentType(..), Screen(..), servers)
import Model exposing (Model)


view : Model -> Html Msg
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
        div
            [ class "outer" ]
            [ div
                [ class "columns" ]
                [ viewSidebar
                , div [ id "photos" ] [ viewMain model ]
                ]
            , message
            ]


viewSidebar : Html Msg
viewSidebar =
    div
        [ class "sidebar" ]
        [ h1 [] [ a [ href "/" ] [ text "Waterfall" ] ]

        --        , a [ href "/organise" ] [ text "Manage your pictures" ]
        --        , br [] []
        , a [ href "#upload" ] [ text "Upload a picture" ]
        , ul []
            [ li [] [ a [ href "#home" ] [ text "My timeline" ] ]
            , li [] [ a [ href "#public" ] [ text "Public photos" ] ]
            , li [] [ a [ href "#me" ] [ text "My photos" ] ]
            ]
        , span [ onClick Logout, class "logout" ] [ text "Log out" ]
        , br [] []
        ]


viewMain : Model -> Html Msg
viewMain model =
    case model.authToken of
        Nothing ->
            div [] [ viewLogin model ]

        Just _ ->
            case model.screenShown of
                Photo _ attachmentId ->
                    case ( model.currentStatus, attachmentId ) of
                        ( Just status, photoId ) ->
                            viewPhoto status photoId

                        _ ->
                            div [] []

                SharePath path ->
                    viewSharePath path

                ShareUpload Nothing ->
                    viewShareUpload

                ShareUpload (Just dataUrl) ->
                    viewShareUploaded dataUrl

                _ ->
                    div [] [ viewTimeline model.timeline ]


viewPhoto : Status -> String -> Html Msg
viewPhoto status attachmentId =
    let
        attachment : List Attachment
        attachment =
            List.filter
                (\a -> a.id == attachmentId)
                status.mediaAttachments
    in
        case attachment of
            [ image ] ->
                let
                    element =
                        case image.type_ of
                            Image ->
                                img [ class "photo", src image.url ] []

                            Video ->
                                video [] [ source [ src image.url ] [] ]

                            Gifv ->
                                video [] [ source [ src image.url ] [] ]

                            _ ->
                                span [] [ text "Can't show this content" ]
                in
                    div [ class "lightbox" ]
                        [ div [ class "lightbox-inner" ]
                            [ element
                            , viewStatusContent status.content
                            ]
                        ]

            _ ->
                div [] []


viewLogin : Model -> Html Msg
viewLogin model =
    div []
        [ Html.form [ onSubmit AuthSubmit ]
            [ label [ for "instanceUrl" ] [ text "Instance URL" ]
            , select
                [ onInput ServerSelect ]
                (List.map (\s -> option [ value s.url ] [ text s.url ]) servers)
            ]
        , div []
            [ label [ for "username" ] [ text "Email address" ]
            , input
                [ type_ "text"
                , id "username"
                , onInput Username
                , value model.username
                ]
                []
            ]
        , div []
            [ label [ for "password" ] [ text "Password" ]
            , input
                [ type_ "password"
                , id "password"
                , onInput Password
                , value model.password
                ]
                []
            ]
        , div []
            [ button [ onClick AuthSubmit ] [ text "Log in" ] ]
        ]


viewTimeline : List Status -> Html Msg
viewTimeline timeline =
    let
        timelineOnlyAttachments =
            List.filter (\s -> s.mediaAttachments /= []) timeline
    in
        div [ class "timeline" ]
            (List.map viewStatus timelineOnlyAttachments)


viewStatusContent : Maybe String -> Html Msg
viewStatusContent content =
    case content of
        Nothing ->
            div [] []

        Just html ->
            main_ [ class "content", innerHtml html ] []


viewStatus : Status -> Html Msg
viewStatus status =
    div [ class "status" ]
        [ div [] (List.map (viewAttachment status) status.mediaAttachments)
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
        , input [ type_ "text", onInput ShareTextInput, placeholder "title" ] []
        , br [] []
        , button [ onClick ShareImage ] [ text "Share" ]
        ]


viewShareUpload : Html Msg
viewShareUpload =
    div [ class "share" ]
        [ h1 [] [ text "Select photo" ]
        , input
            [ type_ "file"
            , id "file-upload"
            , on "change" (succeed ImageSelected)
            ]
            []
        ]


viewShareUploaded : String -> Html Msg
viewShareUploaded dataUrl =
    div [ class "share" ]
        [ h1 [] [ text "Upload photo" ]
        , img [ id "file-upload", src dataUrl ] []
        , br [] []
        , input [ type_ "text", onInput ShareTextInput, placeholder "title" ] []
        , br [] []
        , button [ onClick UploadImage ] [ text "Share" ]
        ]
