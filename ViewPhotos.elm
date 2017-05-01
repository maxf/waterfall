module ViewPhotos exposing (viewPhotos)

import Html exposing (..)
import Html.Attributes exposing (class, style, title, src, id, value)
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
            , viewPrevNextButtons model.dateShown
            , case datePhotos of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewPictureList photos ]
            , viewPrevNextButtons model.dateShown
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
        [ div
            []
            [ img [ src metadata.fileName ] []
            , br [] []
            , span [] [ metadata.fileName |> text ]
            , button [ onClick (DeletePhoto metadata) ] [ text "Erase" ]
            ]
        ]


viewOtherDayButton : String -> DateTime -> Int -> Html Msg
viewOtherDayButton label date offset =
    let
        day =
            addDays offset date
    in
        button
            [ onClick (ShowPhotosForDate day) ]
            [ text (label ++ " (" ++ (dateToString day) ++ ")") ]


viewPrevNextButtons : DateTime -> Html Msg
viewPrevNextButtons date =
    div []
        [ viewOtherDayButton "Previous" date -1
        , span [] [ text "..." ]
        , viewOtherDayButton "Next" date 1
        ]
