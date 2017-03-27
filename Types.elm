module Types exposing (..)
import Http
--import Time.Date as Date exposing (..)
import List exposing (..)
import Csv

type alias Year = Int
type alias WeekNumber = Int
type alias DayOfWeek = Int
type alias DayOfMonth = Int


type alias Model =
    { year : Year
    , photoMetadata : List PhotoMetadata
    }


type alias PhotoMetadata =
    { fileName : String
    , dateCreated : String
    }


type Msg
    = Increment
    | Decrement
    | PhotoMetadataLoaded (Result Http.Error String)


stringsToMetadata: List String -> PhotoMetadata
stringsToMetadata fields =
    case fields of
        [fileName, date] -> PhotoMetadata fileName date
        _ -> PhotoMetadata "" ""


buildMeta: String -> List PhotoMetadata
buildMeta csv =
    csv
        |> Csv.parse
        |> .records
        |> List.map stringsToMetadata
