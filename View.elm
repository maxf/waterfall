module View exposing (view)
import Html exposing (Html, button, div, text, h1, table, thead, tbody, tr, td, th, span)
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

        record : Maybe (List PhotoMetadata)
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

isInLastWeekOfMonth : Date.Date -> Bool
isInLastWeekOfMonth date =
    let
        nextWeek = Date.addDays 7 date
    in
        Date.month date /= Date.month nextWeek


isLastDayOfMonth : Date.Date -> Bool
isLastDayOfMonth date =
    let
        nextDay = Date.addDays 1 date
    in
        Date.month date /= Date.month nextDay && Date.weekday date /= Sun

--------------------------------------------------------------------------------
-- HTML generating functions
--------------------------------------------------------------------------------



dateStyle : Date.Date -> Model -> List ( String, String )
dateStyle dateToDisplay model =
    let
        dateCol =
            dateColour dateToDisplay model.photoMetadata

        overrideBorderBottom =
            ("border-bottom"
            , if isInLastWeekOfMonth dateToDisplay then "5px solid black" else ""
            )

        overrideBorderRight =
            ("border-right"
            , if isLastDayOfMonth dateToDisplay then "5px solid black" else ""
            )

    in
        [("background-color", (Tuple.first dateCol))
        , overrideBorderBottom
        , overrideBorderRight
        ]


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
    in
        if Date.year dateToDisplay == Date.year model.dateShown then
            td
                [ class (monthClass ++ " " ++ shownDateClass)
                , style (dateStyle dateToDisplay model)
                , onClick (ShowPhotosForDate dateToDisplay)
                ]
                [ text (calendarDate dateToDisplay) ]
        else
            td [] [ text "" ]


viewWeek : Int -> Model -> WeekNumber -> Html Msg
viewWeek offset model weekNumber =
    tr [] (map (viewDate offset weekNumber model) (range 1 7))


viewWeeks : Int -> Model -> List (Html Msg)
viewWeeks offset model =
    map (viewWeek offset model) (range 0 52)


viewYearButtons : Year -> Html Msg
viewYearButtons year =
    div []
        [ button [ onClick Decrement ] [ text ( toString (year - 1)) ]
        , span [] [ text " ... " ]
        , button [ onClick Increment ] [ text ( toString (year + 1)) ]
        ]


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
            [ h1 [] [ text (toString yearToDisplay) ]
            , viewYearButtons yearToDisplay
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
            , viewYearButtons yearToDisplay
            ]


viewError : Maybe ErrorMessage -> Html Msg
viewError message =
    case message of
        Nothing ->
            div [ style [("display", "none")] ] []

        Just error ->
            div [ class "error" ] [ text error ]


view : Model -> Html Msg
view model =
    div [ class "outer" ]
        [ viewError model.error
        , div
            [ class "columns" ]
            [ viewCalendar model
            , viewPhotos model
            ]
        ]
