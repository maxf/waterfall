module View exposing (view)

import Html exposing (Html, div, button, td, text, tr, span, h1, table, thead, tbody, th, a, br, select, option)
import Html.Events exposing (onClick, on, targetValue)
import Html.Attributes exposing (class, style, href, id)
import Json.Decode exposing (map)
import List exposing (range)
import Time.DateTime as Date exposing (DateTime, weekday, dateTime, zero, day, addDays, month, year, fromTimestamp, toISO8601, addYears)
import Time.Date as Date
import Dict
import Types exposing (Year, toSeconds, SecondsSinceEpoch, PhotoMetadata, MetadataDict, WeekNumber, DayOfWeek, ErrorMessage, UserName, dateToString)
import Model exposing (Model, photoMetadata, dateShown, photoDir, error, users, lastDateWithPhotos, photoMetadata)
import ViewPhotos exposing (viewPhotos)
import Update exposing (Msg(UserSelected), hashForDate)


newYearsDayOffset : Year -> Int
newYearsDayOffset thisYear =
    let
        newYearsDayWeekDay =
            weekday (dateTime { zero | year = thisYear, month = 1, day = 1 })
    in
        case newYearsDayWeekDay of
            Date.Mon ->
                5

            Date.Tue ->
                4

            Date.Wed ->
                3

            Date.Thu ->
                2

            Date.Fri ->
                1

            Date.Sat ->
                0

            Date.Sun ->
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
                        100
                            - (100 * min 1 ((List.length r |> toFloat) / 50))
                            |> floor
                            |> toString
                in
                    ( "rgb(128, " ++ shade ++ "," ++ shade ++ ")"
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
        (month date /= month nextDay) && (weekday date /= Date.Sun)



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


dateBorderClasses : DateTime -> String
dateBorderClasses dateToDisplay =
    let
        borderBottomClass =
            if isInLastWeekOfMonth dateToDisplay then
                "last-week"
            else
                ""

        borderRightClass =
            if isLastDayOfMonth dateToDisplay then
                "last-day"
            else
                ""
    in
        String.join " " [ borderBottomClass, borderRightClass ]


viewDate : DateTime -> Int -> WeekNumber -> Model -> DayOfWeek -> Html Msg
viewDate date offset weekNumber model dayOfWeek =
    let
        dateToDisplay =
            dateTime { zero | year = year date, month = 1, day = 1 }
                |> addDays (7 * (weekNumber - 1) + dayOfWeek + 1 + offset)

        monthClass =
            if month dateToDisplay % 2 == 0 then
                "odd"
            else
                "even"

        -- if the day to draw is the day of the photos shown
        -- mark it with class 'today'
        shownDateClass =
            if dateToDisplay == date then
                "today"
            else
                ""

        borderClasses =
            dateBorderClasses dateToDisplay
    in
        if year dateToDisplay == year date then
            td
                [ class (monthClass ++ " " ++ shownDateClass ++ " " ++ borderClasses)
                , style (dateStyle dateToDisplay model)
                ]
                [ a [ href (hashForDate dateToDisplay) ] [ text (calendarDate dateToDisplay) ] ]
        else
            td [] [ text "" ]


viewWeek : DateTime -> Int -> Model -> WeekNumber -> Html Msg
viewWeek date offset model weekNumber =
    tr [] (List.map (viewDate date offset weekNumber model) (range 1 7))


viewWeeks : DateTime -> Int -> Model -> List (Html Msg)
viewWeeks date offset model =
    List.map (viewWeek date offset model) (range 0 52)


viewYearButtons : DateTime -> Html Msg
viewYearButtons date =
    div [ class "year-buttons" ]
        [ a
            [ href (hashForDate (addYears -1 date)) ]
            [ text (toString ((year date) - 1) ++ " ⬅") ]
        , a
            [ href (hashForDate (addYears 1 date)) ]
            [ text ("➡ " ++ toString ((year date) + 1)) ]
        ]


viewCalendar : Model -> DateTime -> Html Msg
viewCalendar model dateToShow =
    let
        yearToDisplay =
            dateToShow |> year

        offset =
            newYearsDayOffset yearToDisplay

        dateShownTs =
            dateToShow |> Types.toSeconds

        -- the prev day after dateToShow that has photos
        nextDateWithPhotos : DateTime
        nextDateWithPhotos =
            model
                |> photoMetadata
                |> Dict.keys
                |> List.filter (\timestamp -> timestamp > dateShownTs)
                |> List.head
                |> Maybe.withDefault dateShownTs
                |> (*) 1000
                |> toFloat
                |> fromTimestamp

        -- the next day after dateShown that has photos
        prevDateWithPhotos : DateTime
        prevDateWithPhotos =
            model
                |> photoMetadata
                |> Dict.keys
                |> List.filter (\timestamp -> timestamp < dateShownTs)
                |> List.reverse
                |> List.head
                |> Maybe.withDefault dateShownTs
                |> (*) 1000
                |> toFloat
                |> fromTimestamp
    in
        div
            [ class "calendar", id "calendar" ]
            [ a [ href "upload.php" ] [ text "Upload photos" ]
            , br [] []
            , viewUserList (model |> users)
            , h1 [] [ text (toString yearToDisplay) ]
            , viewPrevNextButtons prevDateWithPhotos nextDateWithPhotos
            , viewYearButtons dateToShow
            , table []
                [ thead []
                    [ tr []
                        (List.map
                            (\d -> th [] [ text d ])
                            [ "M", "T", "W", "T", "F", "S", "S" ]
                        )
                    ]
                , tbody [] (viewWeeks dateToShow offset model)
                ]
            , viewPrevNextButtons prevDateWithPhotos nextDateWithPhotos
            , viewYearButtons dateToShow
            ]


viewUserList : List UserName -> Html Msg
viewUserList users =
    let
        usersWithAll =
            "All" :: users
    in
        select
            [ on "change" (Json.Decode.map UserSelected targetValue) ]
            (List.map (\u -> option [] [ text u ]) usersWithAll)


viewError : Maybe ErrorMessage -> Html Msg
viewError message =
    case message of
        Nothing ->
            div [ style [ ( "display", "none" ) ] ] []

        Just errorMessage ->
            div [ class "error" ] [ text errorMessage ]


viewOtherDayButton : String -> DateTime -> Html Msg
viewOtherDayButton label date =
    a [ href (hashForDate date) ] [ text label ]


viewPrevNextButtons : DateTime -> DateTime -> Html Msg
viewPrevNextButtons prev next =
    div [ class "prev-next-buttons" ]
        [ viewOtherDayButton (dateToString prev ++ " ⬅") prev
        , viewOtherDayButton ("➡ " ++ dateToString next) next
        ]


view : Model -> Html Msg
view model =
    let
        dateToShow =
            dateShown model
                |> Maybe.withDefault (lastDateWithPhotos (photoMetadata model))
    in
        div
            [ class "outer" ]
            [ model |> error |> viewError
            , div
                [ class "columns" ]
                [ viewCalendar model dateToShow
                , viewPhotos model dateToShow
                ]
            ]
