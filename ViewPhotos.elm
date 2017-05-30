module ViewPhotos exposing (viewPhotos)

import Html exposing (..)
import Html.Attributes exposing (src, id)
import Types exposing (..)
import Time.DateTime exposing (..)
import Html.Events exposing (onClick)
import Dict


--------------------------------------------------------------------------------
-- View functions
--------------------------------------------------------------------------------


viewPhotos : Model -> Html Msg
viewPhotos model =
    let
        dateExifString =
            (model.dateShown |> toTimestamp) / 1000 |> round

        datePhotos =
            Dict.get dateExifString model.photoMetadata
    in
        div
            [ id "photos" ]
            [ h1 [] [ model.dateShown |> dateToString |> text ]
            , case datePhotos of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewPictureList model.photoDir photos ]
            ]


viewPictureList : DirectoryName -> List PhotoMetadata -> Html Msg
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


viewPicture : DirectoryName -> PhotoMetadata -> Html Msg
viewPicture baseDir metadata =
    li
        []
        [ div
            []
            [ img [ src (baseDir ++ "/" ++ metadata.fileName) ] []
            , br [] []
            , span [] [ metadata.fileName |> text ]
            , button [ onClick (DeletePhoto metadata) ] [ text "Erase" ]
            ]
        ]
