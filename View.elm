module View exposing (view)

import Html exposing (..)
import Html.Events exposing (on, onClick, targetValue)
import Html.Attributes exposing (class, style, title, type_, attribute)
import List exposing (..)
import Time.DateTime as DateTime exposing (..)
import Time.Date exposing (Weekday(..))
import Types exposing (..)
import Dict
import ViewPhotos exposing (viewPhotos)


newYearsDayOffset : Year -> Int
newYearsDayOffset year =
    let
        newYearsDayWeekDay =
            weekday (dateTime { zero | year = year, month = 1, day = 1 })
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


calendarDate : DateTime -> String
calendarDate date =
    day date |> toString


dateColour : DateTime -> MetadataDict -> ( String, Int )
dateColour date metadata =
    let
        dateSeconds : SecondsSinceEpoch
        dateSeconds =
            toSeconds date

        record : Maybe (List PhotoMetadata)
        record =
            Dict.get dateSeconds metadata
    in
        case record of
            Nothing ->
                ( "", 0 )

            Just r ->
                let
                    shade =
                        220
                            - (220 * (min 1 ((List.length r |> toFloat) / 50)))
                            |> floor
                            |> toString
                in
                    ( "rgb(" ++ shade ++ ",255, " ++ shade ++ ")"
                    , List.length r
                    )


isInLastWeekOfMonth : DateTime -> Bool
isInLastWeekOfMonth date =
    let
        nextWeek =
            addDays 7 date
    in
        month date /= month nextWeek


isLastDayOfMonth : DateTime -> Bool
isLastDayOfMonth date =
    let
        nextDay =
            addDays 1 date
    in
        month date /= month nextDay && weekday date /= Sun



--------------------------------------------------------------------------------
-- HTML generating functions
--------------------------------------------------------------------------------


dateStyle : DateTime -> Model -> List ( String, String )
dateStyle dateToDisplay model =
    let
        dateCol =
            dateColour dateToDisplay model.photoMetadata

        overrideBorderBottom =
            ( "border-bottom"
            , if isInLastWeekOfMonth dateToDisplay then
                "5px solid black"
              else
                ""
            )

        overrideBorderRight =
            ( "border-right"
            , if isLastDayOfMonth dateToDisplay then
                "5px solid black"
              else
                ""
            )
    in
        [ ( "background-color", (Tuple.first dateCol) )
        , overrideBorderBottom
        , overrideBorderRight
        ]


viewDate : Int -> WeekNumber -> Model -> DayOfWeek -> Html Msg
viewDate offset weekNumber model dayOfWeek =
    let
        dateToDisplay =
            dateTime { zero | year = year model.dateShown, month = 1, day = 1 }
                |> addDays (7 * (weekNumber - 1) + dayOfWeek + 1 + offset)

        monthClass =
            if (month dateToDisplay) % 2 == 0 then
                "odd"
            else
                "even"

        -- if the day to draw is the day of the photos shown
        -- mark it with class 'today'
        shownDateClass =
            if dateToDisplay == model.dateShown then
                "today"
            else
                ""
    in
        if year dateToDisplay == year model.dateShown then
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
    tr [] (List.map (viewDate offset weekNumber model) (range 1 7))


viewWeeks : Int -> Model -> List (Html Msg)
viewWeeks offset model =
    List.map (viewWeek offset model) (range 0 52)


viewYearButtons : Year -> Html Msg
viewYearButtons year =
    div [ class "year-buttons" ]
        [ button [ onClick DecrementYear ] [ text (toString (year - 1)) ]
        , span [] [ text " ... " ]
        , button [ onClick IncrementYear ] [ text (toString (year + 1)) ]
        ]


viewCalendar : Model -> Html Msg
viewCalendar model =
    let
        yearToDisplay =
            year model.dateShown

        offset =
            newYearsDayOffset yearToDisplay
    in
        div
            [ class "calendar" ]
            [ button [ onClick RequestPhotoDir ] [ text "Choose folder" ]
            , h1 [] [ text (toString yearToDisplay) ]
            , viewYearButtons yearToDisplay
            , table []
                [ thead []
                    [ tr []
                        (List.map
                            (\d -> th [] [ text d ])
                            [ "M", "T", "W", "T", "F", "S", "S" ]
                        )
                    ]
                , tbody [] (viewWeeks offset model)
                ]
            , viewYearButtons yearToDisplay
            ]


viewError : Maybe ErrorMessage -> Html Msg
viewError message =
    case message of
        Nothing ->
            div [ style [ ( "display", "none" ) ] ] []

        Just error ->
            div [ class "error" ] [ text error ]


view : Model -> Html Msg
view model =
    div
        [ class "outer" ]
        [ viewError model.error
        , div
            [ class "columns" ]
            [ viewCalendar model
            , viewPhotos model
            ]
        ]
