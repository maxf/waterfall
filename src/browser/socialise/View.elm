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

                Just _ ->
                    div
                        [ class "error", onClick CloseMessage ]
                        [ model.message |> Maybe.withDefault "" |> text ]
    in
        case model.authToken of
            Nothing ->
                div []
                    [ message
                    , div []
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
    div [ class "timeline" ]
        (List.map viewStatus timeline)


viewStatus : Status -> Html Msg
viewStatus status =
    div [ class "status" ]
        [ div [] (List.map viewAttachment status.mediaAttachments)
        , div [ class "content", innerHtml status.content ] []
        , div [ class "account", innerHtml status.account.username ] []
        ]


viewAttachment : Attachment -> Html Msg
viewAttachment attachment =
    case attachment.type_ of
        Image ->
            img [ src attachment.previewUrl ] []

        Video ->
            p [] [ text "video" ]

        Gifv ->
            p [] [ text "gifv" ]

        Unknown ->
            p [] [ text "unkown" ]
