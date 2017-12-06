module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, img, text, a, button, span)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id, style, class, href)
import Html.Events exposing (onClick)
import Http exposing (encodeUri)
import Model exposing (Model, photoShown, photos, albumShown, toHash, nextPhoto, prevPhoto)
import Types exposing (PhotoMetadata, HashFields, AlbumHash(Album, NoAlbum, AllAlbums))
import Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto))


viewPhotos : Model -> Html Msg
viewPhotos model =
    div
        [ id "photos" ]
        (case model |> albumShown of
            NoAlbum ->
                [ h1 [] [ text "Select an album" ] ]

            AllAlbums ->
                [ h1 [] [ text "All photos" ]
                , div [] [ viewThumbnails model ]
                , viewPhoto model
                ]

            Album title ->
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
                    (viewThumbnail model)
                    (List.sortWith sortByMaybeDate (model |> photos))
                )
            ]


viewThumbnail : Model -> PhotoMetadata -> ( String, Html Msg )
viewThumbnail model metadata =
    let
        photoId =
            toHash
                (HashFields
                    (albumShown model)
                    (Just metadata.relativeFilePath)
                )
    in
        ( photoId
        , li
            []
            [ div
                []
                [ a [ href photoId ]
                    [ img
                        [ src ("/thumb?photo=" ++ encodeUri metadata.relativeFilePath)
                        , class "thumbnail"
                        ]
                        []
                    ]
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

                link =
                    HashFields (albumShown model) Nothing |> toHash

                prevPhotoLink =
                    case model |> prevPhoto of
                        Nothing ->
                            span [] []
                        Just photo ->
                            a [ link ++ (photo.relativeFilePath |> encodeUri) |> href ] [ text "🢀" ]

                nextPhotoLink =
                    case model |> nextPhoto of
                        Nothing ->
                            span [] []
                        Just photo ->
                            a [ link ++ (photo.relativeFilePath |> encodeUri) |> href ] [ text "🢂" ]

            in
                div [ class "lightbox" ]
                    [ div [ class "lightbox-inner" ]
                        [ a [ href link ]
                            [ img [ src ("/preview?photo=" ++ encodeUri path) ] [] ]
                        ]
                    , div [ class "buttons" ]
                        [ prevPhotoLink
                        , button
                            [ onClick (UserAskedToDeleteAPhoto path) ]
                            [ text "🗑" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 90 path) ]
                            [ text "↻" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 270 path) ]
                            [ text "↺" ]
                        , nextPhotoLink
                        ]
                    , a [ href link, class "close" ] [ text "❌" ]
                    ]
