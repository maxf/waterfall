module DateUtils exposing (..)

import Time.Date as Date exposing (..)
import String exposing (toInt)
import Regex exposing (split, HowMany(..), regex)

monthName : Date -> String
monthName date =
    case month date of
        1 -> "January"
        2 -> "February"
        3 -> "March"
        4 -> "April"
        5 -> "May"
        6 -> "June"
        7 -> "July"
        8 -> "August"
        9 -> "September"
        10 -> "October"
        11 -> "November"
        12 -> "December"
        _ -> "(Error: Bad month)"


dateToString : Date -> String
dateToString date =
    (date |> day |> toString) ++ " "
    ++ (date |> monthName) ++ " "
    ++ (date |> year |> toString)


dateToExifString : Date -> String
dateToExifString date =
    (Date.year date |> toString)
    ++ ":" ++ (Date.month date |> toString |> String.padLeft 2 '0')
    ++ ":" ++ (Date.day date |> toString |> String.padLeft 2 '0')


dateStringToDate : String -> Maybe Date
dateStringToDate text =
    case Regex.split All (regex ":") text of
        [ year, month, day ] ->
            Just (date
                (year |> toInt |> Result.withDefault 1970)
                (month |> toInt |> Result.withDefault 1)
                (day |> toInt |> Result.withDefault 1))

        _ ->
            Nothing
