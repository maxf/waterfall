module ViewPhotos exposing (viewPhotos)
import Html exposing (..)
import Html.Attributes exposing (class, style, title, src, id, value)
import Types exposing (..)
import DateUtils exposing (..)
import Time.Date as Date exposing (Weekday(..))
import Html.Events exposing (onClick)
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
            , viewPrevNextButtons model.dateShown
            , case datePhotos of
                Nothing -> div [] [ text "No photos for that date" ]
                Just photos -> div [] [ viewPictureList photos ]
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
        [ img [ src metadata.fileName ] [] ]


viewOtherDayButton : String -> Date.Date -> Int -> Html Msg
viewOtherDayButton label date offset =
    let
        day =
            Date.addDays offset date
    in
        button
            [ onClick (ShowPhotosForDate day) ]
            [ text (label ++ " (" ++ (dateToString day) ++ ")") ]


viewPrevNextButtons : Date.Date -> Html Msg
viewPrevNextButtons date =
    div []
        [ viewOtherDayButton "Previous" date -1
        , span [] [ text "..." ]
        , viewOtherDayButton "Next" date 1
        ]
