module ViewPhotos exposing (viewPhotos)
--import Time.Date as Date exposing (Date, Weekday(..), day, month)
import Html exposing (..)
--import Html.Events exposing (onClick)
import Html.Attributes exposing (class, style, title, src)
import Types exposing (..)

import DateUtils exposing (..)
import Dict



viewPhotos : Model -> Html Msg
viewPhotos model =
    div
        [ class "photos" ]
        [ viewPhotosSection model ]


viewPhotosSection : Model -> Html Msg
viewPhotosSection model =
    let
        dateExifString =
            model.dateShown |> dateToExifString

        datePhotos =
            Dict.get dateExifString model.photoMetadata
    in
        div
            [ class "photos" ]
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
