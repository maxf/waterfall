module Types exposing (..)

import Http exposing (..)
import List exposing (..)
import String exposing (toInt)
import Result exposing (withDefault)
import Dict exposing (..)
import Csv
import Time.Date as Date exposing (Date)
import DateUtils exposing (..)
import Regex exposing (..)

type alias Year = Int
type alias WeekNumber = Int
type alias DayOfWeek = Int
type alias DayOfMonth = Int
type alias FileName = String
type alias ErrorMessage = String
type alias CsvField = String
type alias CsvData = String

-- Date as a string in Exif Format: YYYY:MM:DD HH:MM:SS
-- Should be a Date, but Date isn't a comparable type
-- TODO: try using milliseconds
type alias ExifDate =
    String

isValidExifDate : ExifDate -> Bool
isValidExifDate date =
    contains
        (regex "^\\d{4}:\\d{2}:\\d{2} \\d{2}:\\d{2}:\\d{2}$")
        date


type alias Model =
    { error : ErrorMessage
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , dateShown : Date
    }


type alias PhotoMetadata =
    { fileName : FileName
    , dateCreated : ExifDate
    }


type Msg
    = Increment
    | Decrement
    | PhotoMetadataLoaded (Result Http.Error CsvData)
    | ShowPhotosForDate Date


type alias MetadataDict
    = Dict ExifDate (List PhotoMetadata)


maxNbPictures : MetadataDict -> Int
maxNbPictures dict =
    dict
        |> Dict.values
        |> List.foldl (\l a -> max (List.length l) a) 0


addPhotoMetadata : PhotoMetadata
                 -> Maybe (List PhotoMetadata)
                 -> Maybe (List PhotoMetadata)
addPhotoMetadata metadata dict =
    case dict of
        Nothing -> Just [ metadata ]
        Just list -> Just (metadata :: list)


stringsToMetadata : List CsvField -> Result ErrorMessage PhotoMetadata
stringsToMetadata csvFields =
    case csvFields of
        [ fileName, dateCreated ] ->
            if isValidExifDate dateCreated then
                Ok (PhotoMetadata fileName dateCreated)
            else
                Err ("Bad exif date: " ++ dateCreated)

        _ ->
            Err (
                "Bad number of CSV fields to photo metadata: " ++
                 (csvFields |> toString)
            )


addToMetadataDict : List CsvField -> MetadataDict -> MetadataDict
addToMetadataDict twoStrings dict =
    let
        newMetadata = stringsToMetadata twoStrings
    in
        case newMetadata of
            Ok metadata ->
                Dict.update
                    (String.left 10 metadata.dateCreated)
                    (addPhotoMetadata metadata)
                    dict
            Err message ->
                dict


buildMeta : Year -> String -> MetadataDict
buildMeta year csvString =
    let
        validDateRecord : List String -> Bool
        validDateRecord l =
            case l of
                [ filename, dateString ] ->
                    String.left 4 dateString == toString year

                _ -> False
    in
        csvString
            |> Csv.parse
            |> .records -- [ ["name1", "date1"], ["name2", "date1"], ["name3", "date2"]]
            -- TODO: Sort by date string
            |> List.filter validDateRecord
            |> List.foldl addToMetadataDict Dict.empty


dateOfFirstPhotoOfYear : Year -> MetadataDict -> Date
dateOfFirstPhotoOfYear year metadata =
    metadata
        |> keys
        |> List.head |> Maybe.withDefault "01:01:1970"
        |> dateStringToDate |> Maybe.withDefault (Date.date 1 1 year)



-- Return the date of the first picture of the incremented date
addYear: Year -> MetadataDict -> Date -> Date
addYear increment metadata date =
    dateOfFirstPhotoOfYear ((Date.year date) + increment) metadata
