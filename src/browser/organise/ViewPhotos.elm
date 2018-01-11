module ViewPhotos exposing (viewPhotos)

import Html exposing (..)
import Html.Keyed exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http exposing (encodeUri)
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
                            span [ class "disabled" ] [ text "🢀" ]

                        Just previous ->
                            span [ onClick (UserClickedThumbnail previous) ] [ text "🢀" ]

                nextPhotoButton =
                    case model |> nextPhoto of
                        Nothing ->
                            span [ class "disabled" ] [ text "🢂" ]

                        Just next ->
                            span [ onClick (UserClickedThumbnail next) ] [ text "🢂" ]
            in
                div [ class "lightbox" ]
                    [ div [ class "lightbox-inner", onClick UserClickedPhoto ]
                        [ img [ src ("/preview?photo=" ++ encodeUri path) ] [] ]
                    , div [ class "buttons" ]
                        [ prevPhotoButton
                        , button
                            [ onClick (UserAskedToDeleteAPhoto path) ]
                            [ text "🗑" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 90 path) ]
                            [ text "↻" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 270 path) ]
                            [ text "↺" ]
                        , button
                            []
                            [ a
                                [ href ("/socialise#share:" ++ encodeUri path) ]
                                [ text "share" ]
                            ]
                        , nextPhotoButton
                        ]
                    , span [ onClick UserClickedPhoto, class "close" ] [ text "❌" ]
                    ]
