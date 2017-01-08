module View exposing (view)

import Html exposing (..)
import Html.Events exposing (..)
import Html.Attributes exposing (..)
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
            [ class "albums" ]
            [ h1 [] [ a [ href "/" ] [ text "Waterfall" ] ]
            , a [ href "/socialise" ] [ text "Go social" ]
            , h2 [] [ text "Albums" ]
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
