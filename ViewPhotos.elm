module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, img, text, a)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id, style, class, href)
import Time.DateTime exposing (DateTime, toTimestamp)
import Dict
import Regex exposing (HowMany(All), regex, replace)
import Model exposing (Model, photoShown, photoMetadata)
import Types exposing (PhotoMetadata, FileName, dateToString)
import Update exposing (Msg, hashForTimestamp, hashForDate)


viewPhotos : Model -> DateTime -> Html Msg
viewPhotos model dateShown =
    let
        dateExifString =
            (dateShown |> toTimestamp) / 1000 |> round

        photosForDate =
            Dict.get dateExifString (photoMetadata model)
    in
        div
            [ id "photos" ]
            [ h1 [] [ dateShown |> dateToString |> text ]
            , case photosForDate of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewThumbnails photos ]
            , viewPhoto dateShown (model |> photoShown)
            ]


viewThumbnails : List PhotoMetadata -> Html Msg
viewThumbnails metadataList =
    div
        []
        [ h2 [] [ text ((List.length metadataList |> toString) ++ " photos") ]
        , ul
            []
            (List.map
                viewThumbnail
                (List.sortBy .dateCreated metadataList)
            )
        ]


viewThumbnail : PhotoMetadata -> ( String, Html Msg )
viewThumbnail metadata =
    let
        photoId =
            hashForTimestamp metadata.dateCreated
                ++ "_"
                ++ replace All (regex "/") (\_ -> "=") metadata.relativeFilePath
    in
        ( metadata.relativeFilePath
        , li
            []
            [ div
                []
                [ a [ href photoId ]
                    [ img
                        [ src ("picture.php?w=300&path=" ++ metadata.relativeFilePath)
                        , class "thumbnail"
                        ]
                        []
                    ]

                --                , br [] []
                --                , span [] [ (metadata.relativeFilePath ++ " - ") |> text ]
                --                , button [ onClick (UserAskedToDeleteAPhoto metadata) ] [ text "Erase" ]
                ]
            ]
        )


viewPhoto : DateTime -> Maybe FileName -> Html Msg
viewPhoto photoDate fileName =
    case fileName of
        Nothing ->
            div [ style [ ( "display", "none" ) ] ] []

        Just name ->
            div [ class "lightbox" ]
                [ div [ class "lightbox-inner" ]
                    [ a [ href (hashForDate photoDate) ]
                        [ img [ src name ] [] ]
                    ]
                ]
