module View exposing (view)

import Html exposing (Html, div, text, input, label, button, ul, li)
import Html.Attributes exposing (for, id, type_, class, value)
import Html.Events exposing (onInput, onClick)
import Update exposing (Msg(..))
import Model exposing (Model, Status)


view : Model -> Html Msg
view model =
    let
        message =
            case model.message of
                Nothing ->
                    div [] []

                Just test ->
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
    ul []
        (List.map viewTimelineItem timeline)


viewTimelineItem : Status -> Html Msg
viewTimelineItem status =
    li [] [ text status.content ]
