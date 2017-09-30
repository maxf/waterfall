module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, button, span, img, br, text)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id)
import Update exposing (Msg(DeletePhoto))
import Time.DateTime exposing (toTimestamp)
import Html.Events exposing (onClick)
import Dict
import Model exposing (Model, dateShown, photoMetadata, photoDir)
import Types exposing (PhotoMetadata, DirectoryName)


viewPhotos : Model -> Html Msg
viewPhotos model =
    let
        dateExifString =
            (model |> dateShown |> toTimestamp) / 1000 |> round

        datePhotos =
            Dict.get dateExifString (photoMetadata model)
    in
        div
            [ id "photos" ]
            [ h1 [] [ model |> dateShown |> Types.dateToString |> text ]
            , case datePhotos of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewPictureList (photoDir model) photos ]
            ]


viewPictureList : Types.DirectoryName -> List Types.PhotoMetadata -> Html Msg
viewPictureList baseDir metadataList =
    div
        []
        [ h2 [] [ text ((List.length metadataList |> toString) ++ " photos") ]
        , ul
            []
            (List.map
                (viewPicture baseDir)
                (List.sortBy .dateCreated metadataList)
            )
        ]


viewPicture : DirectoryName -> Types.PhotoMetadata -> (String, Html Msg)
viewPicture baseDir metadata =
    ( metadata.relativeFilePath
    , li
        []
        [ div
            []
            [ img [ src (metadata.relativeFilePath) ] []
            , br [] []
            , span [] [ (metadata.relativeFilePath ++ " - ") |> text ]
            , button [ onClick (DeletePhoto metadata) ] [ text "Erase" ]
            ]
        ]
    )
