module View exposing (view)
import Html exposing (Html, button, div, text, h1, table, thead, tbody, tr, td, th)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class, style, title)
import List exposing (..)
import Time.Date as Date exposing (Weekday(..))
import Types exposing (..)
import Dict

import ViewPhotos exposing (viewPhotos)
import DateUtils exposing (..)


newYearsDayOffset : Year -> Int
newYearsDayOffset year =
    let
        newYearsDayWeekDay =
            Date.weekday (Date.date year 1 1)
    in
        case newYearsDayWeekDay of
            Mon ->
                5

            Tue ->
                4

            Wed ->
                3

            Thu ->
                2

            Fri ->
                1

            Sat ->
                0

            Sun ->
                -1


calendarDate : Date.Date -> String
calendarDate date =
    (Date.day date |> toString)


dateColour : Date.Date -> MetadataDict -> ( String, Int )
dateColour date metadata =
    let
        dateString : String
        dateString =
            dateToExifString date

        record : Maybe (List String)
        record =
            Dict.get dateString metadata
    in
        case record of
            Nothing -> ( "", 0 )
            Just r ->
                let
                    numPix = List.length r
                    shade =
                        220 - (220 * (min 1 ((List.length r |> toFloat) / 50)))
                          |> toString
                in
                    ( "rgb(" ++ shade ++ ",255, " ++ shade ++ ")"
                    , List.length r
                    )



--------------------------------------------------------------------------------
-- HTML generating functions
--------------------------------------------------------------------------------


viewDate : Int -> WeekNumber -> Model -> DayOfWeek -> Html Msg
viewDate offset weekNumber model dayOfWeek =
    let
        dateToDisplay =
            Date.date (Date.year model.dateShown) 1 1
                |> Date.addDays (7 * (weekNumber - 1) + dayOfWeek + 1 + offset)

        monthClass =
            if (Date.month dateToDisplay) % 2 == 0 then
                "odd"
            else
                "even"

        -- if the day to draw is the day of the photos shown
        -- mark it with class 'today'
        shownDateClass =
            if dateToDisplay == model.dateShown then "today" else ""

        dateCol =
            dateColour dateToDisplay model.photoMetadata
    in
        td
            [ class (monthClass ++ " " ++ shownDateClass)
            , style [("background-color", (Tuple.first dateCol))]
            , title ((dateCol |> Tuple.second |> toString) ++ " photos")
            , onClick (ShowPhotosForDate dateToDisplay)
            ]
            [ if Date.year dateToDisplay == Date.year model.dateShown then
                -- only show day if this date is in the current year
                text (calendarDate dateToDisplay)
              else
                text ""
            ]


viewWeek : Int -> Model -> WeekNumber -> Html Msg
viewWeek offset model weekNumber =
    tr [] (map (viewDate offset weekNumber model) (range 1 7))


viewWeeks : Int -> Model -> List (Html Msg)
viewWeeks offset model =
    map (viewWeek offset model) (range 0 52)


viewCalendar : Model -> Html Msg
viewCalendar model =
    let
        yearToDisplay =
            Date.year model.dateShown

        offset =
            newYearsDayOffset yearToDisplay
    in
        div
            [ class "calendar" ]
            [ button [ onClick Decrement ] [ text "-" ]
            , button [ onClick Increment ] [ text "+" ]
            , h1 [] [ text (toString yearToDisplay) ]
            , table []
                [ thead []
                    [ tr []
                        [ th [] [ text "M" ]
                        , th [] [ text "T" ]
                        , th [] [ text "W" ]
                        , th [] [ text "T" ]
                        , th [] [ text "F" ]
                        , th [] [ text "S" ]
                        , th [] [ text "S" ]
                        ]
                    ]
                , tbody [] (viewWeeks offset model)
                ]
            ]


view : Model -> Html Msg
view model =
    div []
        [ div
            [ class "header" ]
            [ div [] [ text model.error ] ]
        , div
            [ class "columns" ]
            [ viewCalendar model
            , viewPhotos model
            ]
        ]
