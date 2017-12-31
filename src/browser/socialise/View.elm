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
        div [] [ message, viewMain model ]


viewMain : Model -> Html Msg
viewMain model =
    case model.authToken of
        Nothing ->
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

        Just _ ->
            viewTimeline model.timeline


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
        , div [ class "account", innerHtml status.account.username ] []
        ]


viewAttachment : Attachment -> Html Msg
viewAttachment attachment =
    case attachment.type_ of
        Unknown ->
            span [] []

        _ ->
            a [ href attachment.url ] [ img [ src attachment.previewUrl ] [] ]
