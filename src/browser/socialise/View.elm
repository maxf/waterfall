module View exposing (view)

--import Html.Attributes.Extra exposing (..)

import Auth exposing (loginUrl)
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
                [ (if model.view /= LoginPage then viewSidebar model else div [] [])
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
            div [] [ a [ href "/" ] [ text "Log in" ] ]

        Just name ->
            div []
                [ div []
                    [ span [ class "username" ] [ text name ]
                    , a
                        [ href "#logout", class "logout" ]
                        [ text "Log out" ]
                    ]
                , ul []
                    [ li [] [ a [ href "/" ] [ text "Home" ] ]
                    , li [] [ a [ href "#public" ] [ text "Public photos" ] ]
                    , li [] [ a [ href "#me" ] [ text "My photos" ] ]
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
