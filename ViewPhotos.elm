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

        dateShownTs =
            Types.toSeconds model.dateShown


        -- the prev day after dateShown that has photos
        nextDateWithPhotos : DateTime
        nextDateWithPhotos =
            Dict.keys model.photoMetadata
                |> List.filter (\timestamp -> timestamp > dateShownTs)
                |> List.head
                |> Maybe.withDefault dateShownTs
                |> (*) 1000
                |> toFloat
                |> fromTimestamp

        -- the next day after dateShown that has photos
        prevDateWithPhotos : DateTime
        prevDateWithPhotos =
            Dict.keys model.photoMetadata
                |> List.filter (\timestamp -> timestamp < dateShownTs)
                |> List.reverse
                |> List.head
                |> Maybe.withDefault dateShownTs
                |> (*) 1000
                |> toFloat
                |> fromTimestamp

    in
        div
            [ id "photos" ]
            [ h1 [] [ model.dateShown |> dateToString |> text ]
            , viewPrevNextButtons prevDateWithPhotos nextDateWithPhotos
            , case datePhotos of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewPictureList photos ]
            , viewPrevNextButtons prevDateWithPhotos nextDateWithPhotos
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


viewOtherDayButton : String -> DateTime -> Html Msg
viewOtherDayButton label date =
    button
        [ onClick (ShowPhotosForDate date) ]
        [ text (label ++ " (" ++ (dateToString date) ++ ")") ]


viewPrevNextButtons : DateTime -> DateTime -> Html Msg
viewPrevNextButtons prev next =
    div []
        [ viewOtherDayButton "Previous" prev
        , span [] [ text "..." ]
        , viewOtherDayButton "Next" next
        ]
