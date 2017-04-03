module DateUtils exposing (..)

import Time.Date as Date exposing (Date, Weekday(..), day, month)

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
        _ -> "(Error: Bad month)"


dateToString : Date -> String
dateToString date =
    (date |> day |> toString) ++ " " ++ (date |> monthName)


dateToExifString : Date -> String
dateToExifString date =
    (Date.year date |> toString)
    ++ ":" ++ (Date.month date |> toString |> String.padLeft 2 '0')
    ++ ":" ++ (Date.day date |> toString |> String.padLeft 2 '0')
