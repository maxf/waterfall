module Main exposing (..)

import Html exposing (Html, button, div, text, h1, table, thead, tbody, tr, td, th)
import Html.Events exposing (onClick)
import Html.Attributes exposing (class)
import List exposing (..)
import Time.Date as Date exposing (Weekday(..))

import Rest
import Types exposing (..)

main : Program Never Model Msg
main =
    Html.program
        { view = view, update = update, init = init, subscriptions = \_ -> Sub.none }





init : (Model, Cmd Msg)
init =
    Model 2017 [ PhotoMetadata "" "" ]
        ! [ Rest.fetchPhotoMetadata ]



update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | year = model.year + 1 }, Cmd.none )

        Decrement ->
            ( { model | year = model.year - 1 }, Cmd.none )

        PhotoMetadataLoaded (Ok csv) ->
            ( { model | photoMetadata = Types.buildMeta csv }, Cmd.none )

        PhotoMetadataLoaded (Err _) ->
            ( model, Cmd.none )


--------------------------------------------------------------------------------

newYearsDayOffset: Year -> Int
newYearsDayOffset year =
    let
        newYearsDayWeekDay = Date.weekday (Date.date year 1 1)
    in
        case newYearsDayWeekDay of
            Mon -> 5
            Tue -> 4
            Wed -> 3
            Thu -> 2
            Fri -> 1
            Sat -> 0
            Sun -> -1


calendarDate: Date.Date -> String
calendarDate date =
--    (Date.weekday date |> toString) ++ " " ++
    (Date.day date |> toString)
--    ++ "/" ++ (Date.month date |> toString)


--dateString : Int -> WeekNumber -> DayOfWeek -> Year -> Html Msg
--dateString offset weekNumber dayOfWeek thisYear =

--------------------------------------------------------------------------------
-- View functions
--------------------------------------------------------------------------------

viewDate : Int -> WeekNumber -> Year -> DayOfWeek -> Html Msg
viewDate offset weekNumber thisYear dayOfWeek  =
    let
        thisDate =
            Date.date thisYear 1 1
                |> Date.addDays (7*(weekNumber-1) + dayOfWeek + 1 + offset)
        monthClass =
            if (Date.month thisDate) % 2 == 0 then "odd" else "even"
    in
        td [ class monthClass ]
        [
        if Date.year thisDate == thisYear then
            text (calendarDate thisDate)
        else
            text ""
        ]

--    dateString offset weekNumber dayOfWeek thisYear


viewWeek : Int -> Year -> WeekNumber -> Html Msg
viewWeek offset year weekNumber =
    tr [] (map (viewDate offset weekNumber year) (range 1 7))


viewWeeks : Int -> Year -> List (Html Msg)
viewWeeks offset year =
    map (viewWeek offset year) (range 0 52)


viewCalendar : Year -> Html Msg
viewCalendar year =
    let
        offset = newYearsDayOffset year
    in
        div []
            [ h1 [] [ text (toString year) ]
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
            , tbody [] (viewWeeks offset year)
            ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick Decrement ] [ text "-" ]
        , button [ onClick Increment ] [ text "+" ]
        , viewCalendar model.year
        ]
