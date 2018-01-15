module ViewPhotos exposing (viewPhotos)

import Html exposing (..)
import Html.Keyed exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http exposing (encodeUri)
import Color exposing (black, red)
import Material.Icons.Navigation exposing (arrow_forward, arrow_back)
import Material.Icons.Social exposing (share)
import Material.Icons.Action exposing (delete_forever, highlight_off)
import Material.Icons.Image exposing (rotate_left, rotate_right)
import Model exposing (Model, photoShown, photos, albumShown, nextPhoto, prevPhoto)
import Types exposing (Photo)
import Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedThumbnail, UserClickedPhoto))


viewPhotos : Model -> Html Msg
viewPhotos model =
    div
        [ id "photos" ]
        (case model |> albumShown of
            Nothing ->
                [ h1 [] [ text "Select an album" ] ]

            Just title ->
                [ h1 [] [ text title ]
                , div [] [ viewThumbnails model ]
                , viewPhoto model
                ]
        )


viewThumbnails : Model -> Html Msg
viewThumbnails model =
    div
        []
        [ h2 [] [ text ((List.length (model |> photos) |> toString) ++ " photos") ]
        , Html.Keyed.ul
            [ class "contact-print" ]
            (List.map
                viewThumbnail
                (model |> photos)
            )
        ]


viewThumbnail : Photo -> ( String, Html Msg )
viewThumbnail metadata =
    ( metadata.relativeFilePath
    , li
        [ onClick (UserClickedThumbnail metadata) ]
        [ div
            []
            [ img
                [ src ("/thumb?photo=" ++ encodeUri metadata.relativeFilePath)
                , class "thumbnail"
                ]
                []
            ]
        ]
    )


viewPhoto : Model -> Html Msg
viewPhoto model =
    case model |> photoShown of
        Nothing ->
            div [ style [ ( "display", "none" ) ] ] []

        Just photo ->
            let
                path =
                    photo.relativeFilePath

                prevPhotoButton =
                    case model |> prevPhoto of
                        Nothing ->
                            button [ class "disabled" ] [ arrow_back black 40 ]

                        Just previous ->
                            button [ onClick (UserClickedThumbnail previous) ] [ arrow_back black 40 ]

                nextPhotoButton =
                    case model |> nextPhoto of
                        Nothing ->
                            button [ class "disabled" ] [ arrow_forward black 40 ]

                        Just next ->
                            button [ onClick (UserClickedThumbnail next) ] [ arrow_forward black 40 ]
            in
                div [ class "lightbox" ]
                    [ div
                        [ class "lightbox-inner", onClick UserClickedPhoto ]
                        [ img [ src ("/preview?photo=" ++ encodeUri path) ] []
                        , span
                            [ onClick UserClickedPhoto, class "close" ]
                            [ highlight_off red 30 ]
                        ]
                    , div [ class "buttons" ]
                        [ prevPhotoButton
                        , button
                            [ onClick (UserAskedToDeleteAPhoto path) ]
                            [ delete_forever black 40 ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 90 path) ]
                            [ rotate_right black 40 ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 270 path) ]
                            [ rotate_left black 40 ]
                        , button
                            []
                            [ a
                                [ href ("/socialise#share:" ++ encodeUri path) ]
                                [ share black 40 ]
                            ]
                        , nextPhotoButton
                        ]
                    ]
