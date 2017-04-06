module ViewPhotos exposing (viewPhotos)
import Html exposing (..)
import Html.Attributes exposing (class, style, title, src, id)
import Types exposing (..)
import DateUtils exposing (..)
import Dict


--------------------------------------------------------------------------------
-- View functions
--------------------------------------------------------------------------------

viewPhotos : Model -> Html Msg
viewPhotos model =
    let
        dateExifString =
            model.dateShown |> dateToExifString

        datePhotos =
            Dict.get dateExifString model.photoMetadata
    in
        div
            [ id "photos" ]
            [ h1 [] [ model.dateShown |> dateToString |> text ]
            , case datePhotos of
                Nothing -> div [] [ text "No photos for that date" ]
                Just photos -> div [] [ viewPictureList photos ]
            ]


viewPictureList : List PhotoMetadata -> Html Msg
viewPictureList metadataList =
    div
        []
        [ h2 [] [ text ((List.length metadataList |> toString) ++ " photos") ]
        , ul
            []
            (List.map viewPicture (List.sortBy .dateCreated metadataList))
        ]


viewPicture : PhotoMetadata -> Html Msg
viewPicture metadata =
    li
        []
        [ img [ src metadata.fileName ] [] ]
