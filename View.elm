module View exposing (view)

import Html exposing (Html, div, text, a, ul, li)


--import Html.Events exposing (on, targetValue)

import Html.Attributes exposing (class, style, href, id)


--import Json.Decode

import Types exposing (HashFields, AlbumHash(Album))
import Model exposing (Model, photoShown, albums, message, toHash)
import ViewPhotos exposing (viewPhotos)
import Update exposing (Msg)


viewAlbumList : Model -> Html Msg
viewAlbumList model =
    let
        liFn u =
            let
                preview =
                    Maybe.map .relativeFilePath (photoShown model)

                link =
                    HashFields (Album u) preview |> toHash
            in
                li []
                    [ a [ href link ]
                        [ (if u == "" then
                            "All"
                           else
                            u
                          )
                            |> text
                        ]
                    ]
    in
        div
            [ class "calendar", id "calendar" ]
            [ div [] [ a [ href "/" ] [ text "Waterfall" ] ]
            , ul [] (List.map liFn (albums model))
            ]


viewMessage : String -> Html Msg
viewMessage messageText =
    case messageText of
        "" ->
            div [ style [ ( "display", "none" ) ] ] []

        _ ->
            div [ class "error" ] [ text messageText ]


view : Model -> Html Msg
view model =
    div
        [ class "outer" ]
        [ model |> message |> viewMessage
        , div
            [ class "columns" ]
            [ viewAlbumList model
            , viewPhotos model
            ]
        ]
