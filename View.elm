module View exposing (view)

import Html exposing (Html, div, td, text, tr, h1, table, thead, tbody, th, a, br, ul, li)


--import Html.Events exposing (on, targetValue)

import Html.Attributes exposing (class, style, href, id)


--import Json.Decode

import List exposing (range)
import Types exposing (toSeconds, SecondsSinceEpoch, PhotoMetadata, WeekNumber, DayOfWeek, DisplayDate(Date, DateNotSpecified), HashFields, AlbumHash(Album))
import Model exposing (Model, albumShown, photoShown, albums, photos, message, toHash)
import ViewPhotos exposing (viewPhotos)
import Update exposing (Msg)

viewAlbumList : Model -> Html Msg
viewAlbumList model =
    let
        liFn u =
            let
                link =
                    HashFields (Album u) (photoShown model)
                        |> toHash
            in
                li [] [ a [ href link ] [ (if u == "" then "All" else u) |> text ] ]
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
