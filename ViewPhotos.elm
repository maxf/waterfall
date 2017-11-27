module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, img, text, a, button)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id, style, class, href)
import Html.Events exposing (onClick)
import Http exposing (encodeUri)
import Model exposing (Model, photoShown, photos, albumShown, modelHash, toHash)
import Types exposing (PhotoMetadata, FileName, dateToString, DisplayDate(Date), PreviewHash(NoPreview, Preview), HashFields, AlbumHash(Album, NoAlbum, AllAlbums))
import Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto))


viewPhotos : Model -> Html Msg
viewPhotos model =
    let
        title =
            case model |> albumShown of
                AllAlbums ->
                    "All photos"

                NoAlbum ->
                    ""
                Album path ->
                    path
    in
        div
            [ id "photos" ]
            [ h1 [] [ text title ]
            , div [] [ viewThumbnails model ]
            , viewPhoto model
            ]


viewThumbnails : Model -> Html Msg
viewThumbnails model =
    div
        []
        [ h2 [] [ text ((List.length (model |> photos) |> toString) ++ " photos") ]
        , ul
            [ class "contact-print" ]
            (List.map
                (viewThumbnail model)
                (List.sortBy .dateCreated (model |> photos))
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

        photoLink =
            case albumShown model of
                Album path ->
                    if path == "" then
                        metadata.relativeFilePath
                    else
                        path ++ "/" ++ metadata.relativeFilePath
                _ ->
                    "/" ++ metadata.relativeFilePath
    in
        ( photoId
        , li
            []
            [ div
                []
                [ a [ href photoId ]
                    [ img
                        [ src ("/thumb?photo=" ++ encodeUri photoLink)
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

                imgSrc =
                    case albumShown model of
                        Album path ->
                            path ++ "/" ++ name
                        _ ->
                            "/" ++ name
            in
                div [ class "lightbox" ]
                    [ div [ class "lightbox-inner" ]
                        [ a [ href link ]
                            [ img [ src ("/preview?photo=" ++ encodeUri imgSrc) ] [] ]
                        ]
                    , div [ class "buttons" ]
                        [ button
                            [ onClick (UserAskedToDeleteAPhoto name) ]
                            [ text "🗑" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 90 imgSrc) ]
                            [ text "↻" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 270 imgSrc) ]
                            [ text "↺" ]
                        ]
                    ]
