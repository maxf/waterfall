module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, ul, li, button, span, img, br, text)
import Html.Attributes exposing (src, id)
import Types exposing (Msg(DeletePhoto), DirectoryName)
import Time.DateTime exposing (toTimestamp)
import Html.Events exposing (onClick)
import Dict


--------------------------------------------------------------------------------
-- View functions
--------------------------------------------------------------------------------


viewPhotos : Types.Model -> Html Types.Msg
viewPhotos model =
    let
        dateExifString =
            (model.dateShown |> toTimestamp) / 1000 |> round

        datePhotos =
            Dict.get dateExifString model.photoMetadata
    in
        div
            [ id "photos" ]
            [ h1 [] [ model.dateShown |> Types.dateToString |> text ]
            , case datePhotos of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewPictureList model.photoDir photos ]
            ]


viewPictureList : Types.DirectoryName -> List Types.PhotoMetadata -> Html Types.Msg
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


viewPicture : DirectoryName -> Types.PhotoMetadata -> Html Types.Msg
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
