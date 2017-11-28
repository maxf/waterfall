module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, img, text, a, button)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id, style, class, href)
import Html.Events exposing (onClick)
import Http exposing (encodeUri)
import Model exposing (Model, photoShown, photos, albumShown, toHash)
import Types exposing (PhotoMetadata, PreviewHash(NoPreview, Preview), HashFields, AlbumHash(Album, NoAlbum, AllAlbums))
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
                    (Preview metadata.relativeFilePath)
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
        NoPreview ->
            div [ style [ ( "display", "none" ) ] ] []

        Preview name ->
            let
                link =
                    HashFields (albumShown model) NoPreview
                        |> toHash
            in
                div [ class "lightbox" ]
                    [ div [ class "lightbox-inner" ]
                        [ a [ href link ]
                            [ img [ src ("/preview?photo=" ++ encodeUri name) ] [] ]
                        ]
                    , div [ class "buttons" ]
                        [ button
                            [ onClick (UserAskedToDeleteAPhoto name) ]
                            [ text "🗑" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 90 name) ]
                            [ text "↻" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 270 name) ]
                            [ text "↺" ]
                        ]
                    ]
