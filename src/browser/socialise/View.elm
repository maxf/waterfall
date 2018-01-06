module View exposing (view)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.Extra exposing (..)
import Html.Events exposing (onInput, onClick)
import Types exposing (Msg(..), Status, Attachment, AttachmentType(..))
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
        [ div [] [ a [ href "/" ] [ text "Waterfall" ] ]
        , ul []
            [ li [] [ a [ href "#home" ] [ text "Home" ] ]
            , li [] [ a [ href "#public" ] [ text "Public photos" ] ]
            , li [] [ a [ href "#me" ] [ text "My photos" ] ]
            ]
        , span [ onClick Logout ] [ text "Log out" ]
        ]


viewMain : Model -> Html Msg
viewMain model =
    case model.authToken of
        Nothing ->
            viewLogin model

        Just _ ->
            viewTimeline model.timeline


viewLogin : Model -> Html Msg
viewLogin model =
    div []
        [ div []
            [ label [ for "instanceUrl" ] [ text "Instance URL" ]
            , input
                [ type_ "text"
                , id "instance"
                , onInput InstanceUrl
                , value model.instanceUrl
                ]
                []
            ]
        , div []
            [ label [ for "username" ] [ text "Username" ]
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
            div [ class "content", innerHtml html ] []


viewStatus : Status -> Html Msg
viewStatus status =
    div [ class "status" ]
        [ div [] (List.map viewAttachment status.mediaAttachments)
        , viewStatusContent status.content
        , div
            [ class "account" ]
            [ a
                [ href ("#user:" ++ status.account.id) ]
                [ text status.account.acct ]
            ]
        ]


viewAttachment : Attachment -> Html Msg
viewAttachment attachment =
    case attachment.type_ of
        Unknown ->
            span [] []

        _ ->
            a [ href attachment.url ] [ img [ src attachment.previewUrl ] [] ]
