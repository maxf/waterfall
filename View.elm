module View exposing (view)

import Html exposing (Html, div, td, text, tr, h1, table, thead, tbody, th, a, br, ul, li)


--import Html.Events exposing (on, targetValue)

import Html.Attributes exposing (class, style, href, id)


--import Json.Decode

import List exposing (range)
import Time.DateTime as Date exposing (DateTime, weekday, dateTime, zero, day, addDays, month, year, addYears, addMonths)
import Time.Date as Date
import Dict
import Array exposing (get)
import Maybe exposing (withDefault)
import Types exposing (toSeconds, SecondsSinceEpoch, PhotoMetadata, MetadataDict, WeekNumber, DayOfWeek)
import Model exposing (Model, DisplayDate(Date), dateShown, albumShown, photoShown, albums, lastDateWithPhotos, photoMetadata, message)
import ViewPhotos exposing (viewPhotos)
import Update exposing (Msg, toHash)


monthName : Int -> String
monthName monthNumber =
    Array.fromList [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
        |> get (monthNumber - 1)
        |> withDefault "Bad month number"


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
                        100
                            - (100 * min 1 ((List.length r |> toFloat) / 50))
                            |> floor
                            |> toString
                in
                    ( "rgb(128, " ++ shade ++ "," ++ shade ++ ")"
                    , List.length r
                    )



--------------------------------------------------------------------------------
-- HTML generating functions
--------------------------------------------------------------------------------


dateStyle : DateTime -> Model -> List ( String, String )
dateStyle dateToDisplay model =
    let
        dateCol =
            dateColour dateToDisplay (photoMetadata model)
    in
        [ ( "background-color", Tuple.first dateCol ) ]


daysSinceMonday : Date.Weekday -> Int
daysSinceMonday dayOfWeek =
    case dayOfWeek of
        Date.Mon ->
            0

        Date.Tue ->
            1

        Date.Wed ->
            2

        Date.Thu ->
            3

        Date.Fri ->
            4

        Date.Sat ->
            5

        Date.Sun ->
            6


viewDate : DateTime -> WeekNumber -> Model -> Int -> DateTime -> DayOfWeek -> Html Msg
viewDate refDate weekNumber model offset firstDayOfMonth dayOfWeek =
    let
        dateToDisplay =
            firstDayOfMonth
                |> addDays (7 * (weekNumber - 1) + (dayOfWeek - 1) - offset)

        shownDateClass =
            if dateToDisplay == refDate then
                "today"
            else
                ""

        hash =
            toHash (albumShown model) (photoShown model) (Date dateToDisplay)
    in
        if year dateToDisplay == year refDate && month dateToDisplay == month refDate then
            td
                [ class shownDateClass
                , style (dateStyle dateToDisplay model)
                ]
                [ a [ href hash ] [ text (calendarDate dateToDisplay) ] ]
        else
            td [ class "no-month-date" ] [ text "" ]


viewWeek : DateTime -> Model -> Int -> DateTime -> WeekNumber -> Html Msg
viewWeek refDate model offset firstDayOfMonth weekNumber =
    let
        viewDateFn =
            viewDate refDate weekNumber model offset firstDayOfMonth
    in
        tr [] (List.map viewDateFn (range 1 7))


viewMonth : DateTime -> Model -> Html Msg
viewMonth refDate model =
    let
        firstDayOfMonth =
            dateTime { zero | year = year refDate, month = month refDate, day = 1 }

        offset =
            firstDayOfMonth
                |> weekday
                |> daysSinceMonday

        viewWeekFn =
            viewWeek refDate model offset firstDayOfMonth

        tableHead =
            thead []
                [ tr []
                    (List.map
                        (\d -> th [] [ text d ])
                        [ "M", "T", "W", "T", "F", "S", "S" ]
                    )
                ]

        tableBody =
            tbody [] (List.map viewWeekFn (range 1 6))
    in
        table []
            [ tableHead, tableBody ]


viewYearButtons : Model -> DateTime -> Html Msg
viewYearButtons model date =
    let
        oneYearBefore =
            addYears -1 date

        oneYearAfter =
            addYears 1 date

        prevYearButton =
            div [ class "button" ]
                [ a
                    [ href (toHash (albumShown model) (photoShown model) (Date oneYearBefore)) ]
                    [ text ((oneYearBefore |> year |> toString) ++ " ⬅") ]
                ]

        nextYearButton =
            div [ class "button" ]
                [ a
                    [ href (toHash (albumShown model) (photoShown model) (Date oneYearAfter)) ]
                    [ text ("➡ " ++ (oneYearAfter |> year |> toString)) ]
                ]
    in
        div [ class "buttons" ] [ prevYearButton, nextYearButton ]


viewMonthButtons : Model -> DateTime -> Html Msg
viewMonthButtons model date =
    let
        oneMonthBefore =
            addMonths -1 date

        oneMonthAfter =
            addMonths 1 date

        prevMonthButton =
            div [ class "button" ]
                [ a
                    [ href (toHash (albumShown model) (photoShown model) (Date oneMonthBefore)) ]
                    [ text (monthName (month oneMonthBefore) ++ " ⬅") ]
                ]

        nextMonthButton =
            div [ class "button" ]
                [ a
                    [ href (toHash (albumShown model) (photoShown model) (Date oneMonthAfter)) ]
                    [ text ("➡ " ++ monthName (month oneMonthAfter)) ]
                ]
    in
        div [ class "buttons" ] [ prevMonthButton, nextMonthButton ]


viewCalendar : Model -> DateTime -> Html Msg
viewCalendar model dateToShow =
    let
        yearToDisplay =
            dateToShow |> year

        monthToDisplay =
            dateToShow |> month
    in
        div
            [ class "calendar", id "calendar" ]
            [ div [] [ a [ href "/" ] [ text "Waterfall" ] ]
            , viewAlbumList model
            , h1 []
                [ text (monthName monthToDisplay)
                , br [] []
                , text (toString yearToDisplay)
                ]
            , viewMonthButtons model dateToShow
            , viewMonth dateToShow model
            , viewYearButtons model dateToShow
            ]


viewAlbumList : Model -> Html Msg
viewAlbumList model =
    let
        liFn u =
            let
                link =
                    toHash (Just u) (photoShown model) (dateShown model)
            in
                li [] [ a [ href link ] [ text u ] ]
    in
        ul [] (List.map liFn (albums model))


viewMessage : String -> Html Msg
viewMessage messageText =
    case messageText of
        "" ->
            div [ style [ ( "display", "none" ) ] ] []

        _ ->
            div [ class "error" ] [ text messageText ]


view : Model -> Html Msg
view model =
    let
        dateToShow =
            case dateShown model of
                Date date ->
                    date

                _ ->
                    lastDateWithPhotos (photoMetadata model)
    in
        div
            [ class "outer" ]
            [ model |> message |> viewMessage
            , div
                [ class "columns" ]
                [ viewCalendar model dateToShow
                , viewPhotos model dateToShow
                ]
            ]
