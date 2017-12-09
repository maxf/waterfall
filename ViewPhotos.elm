module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, img, text, button, span)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id, style, class)
import Html.Events exposing (onClick)
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
    let
        sortByMaybeDate timestampA timestampB =
            compare
                (timestampA.dateCreated |> Maybe.withDefault 0)
                (timestampB.dateCreated |> Maybe.withDefault 0)
    in
        div
            []
            [ h2 [] [ text ((List.length (model |> photos) |> toString) ++ " photos") ]
            , ul
                [ class "contact-print" ]
                (List.map
                    viewThumbnail
                    (List.sortWith sortByMaybeDate (model |> photos))
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
                            span [] []

                        Just previous ->
                            span [ onClick (UserClickedThumbnail previous) ] [ text "🢀" ]

                nextPhotoButton =
                    case model |> nextPhoto of
                        Nothing ->
                            span [] []

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
                        , nextPhotoButton
                        ]
                    , span [ onClick UserClickedPhoto, class "close" ] [ text "❌" ]
                    ]
