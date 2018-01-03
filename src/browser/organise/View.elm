module View exposing (view)

import Html exposing (Html, div, text, ul, li, a)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, style, id, href)
import Model exposing (Model, albums, message)
import ViewPhotos exposing (viewPhotos)
import Update exposing (Msg(UserChangedAlbum))
import Types exposing (AlbumDir)


viewAlbumList : Model -> Html Msg
viewAlbumList model =
    let
        liFn : AlbumDir -> Html Msg
        liFn u =
            li [ onClick (UserChangedAlbum u), class "album" ]
                [ text u ]
    in
        div
            [ class "calendar", id "calendar" ]
            [ div [] [ a [ href "/" ] [ text "Waterfall" ] ]
            , ul [] (List.map liFn (model |> albums))
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
        [ div
            [ class "columns" ]
            [ viewAlbumList model
            , viewPhotos model
            ]
        , model |> message |> viewMessage
        ]
