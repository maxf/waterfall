module Types exposing (DirectoryName, PhotoMetadata, Year, toSeconds, SecondsSinceEpoch, MetadataDict, WeekNumber, DayOfWeek, ErrorState(Error, NoError), dateToString, addYear, dateOfFirstPhotoOfYear, maxNbPictures, buildMeta, FileName, JsonString, iso8601ToEpochSeconds, UserName)

import Dict exposing (Dict, keys)
import Time.DateTime exposing (DateTime, dateTime, zero, epoch, year, month, day, addSeconds, toTimestamp, fromISO8601)
import Time exposing (inMilliseconds)


type alias Year =
    Int


type alias WeekNumber =
    Int


type alias DayOfWeek =
    Int


type alias FileName =
    String


type ErrorState
    = Error String
    | NoError


type alias SecondsSinceEpoch =
    Int


type alias DirectoryName =
    String


type alias UserName =
    String


type alias JsonString =
    String


type alias PhotoMetadata =
    { relativeFilePath : FileName
    , dateCreated : SecondsSinceEpoch
    }


type alias MetadataDict =
    Dict SecondsSinceEpoch (List PhotoMetadata)


maxNbPictures : MetadataDict -> Int
maxNbPictures dict =
    dict
        |> Dict.values
        |> List.foldl (\l a -> max (List.length l) a) 0


addPhotoMetadata :
    PhotoMetadata
    -> Maybe (List PhotoMetadata)
    -> Maybe (List PhotoMetadata)
addPhotoMetadata metadata dict =
    case dict of
        Nothing ->
            Just [ metadata ]

        Just list ->
            Just (metadata :: list)


roundToStartOfDay : SecondsSinceEpoch -> SecondsSinceEpoch
roundToStartOfDay seconds =
    let
        date : DateTime
        date =
            addSeconds seconds epoch

        midnight : DateTime
        midnight =
            dateTime
                { zero
                    | year = date |> year
                    , month = date |> month
                    , day = date |> day
                }
    in
        midnight |> toSeconds


addToMetadataDict : PhotoMetadata -> MetadataDict -> MetadataDict
addToMetadataDict metadata dict =
    Dict.update
        (roundToStartOfDay metadata.dateCreated)
        (addPhotoMetadata metadata)
        dict


yearOfDate : SecondsSinceEpoch -> Year
yearOfDate seconds =
    addSeconds seconds epoch |> year


dateToString : DateTime -> String
dateToString date =
    (date |> day |> toString)
        ++ "/"
        ++ (date |> month |> toString)
        ++ "/"
        ++ (date |> year |> toString)


toSeconds : DateTime -> SecondsSinceEpoch
toSeconds date =
    round (toTimestamp date) // 1000


buildMeta : List PhotoMetadata -> MetadataDict
buildMeta list =
    list
        |> List.foldl addToMetadataDict Dict.empty


dateOfFirstPhotoOfYear : Year -> MetadataDict -> DateTime
dateOfFirstPhotoOfYear theYear metadata =
    let
        firstPhotoSeconds =
            metadata
                |> keys
                |> List.filter (\key -> yearOfDate key == theYear)
                |> List.sort
                |> List.head
    in
        case firstPhotoSeconds of
            Nothing ->
                dateTime { zero | year = theYear }

            Just seconds ->
                addSeconds seconds epoch



-- Return the date of the first picture of the incremented date


addYear : Year -> MetadataDict -> DateTime -> DateTime
addYear increment metadata date =
    dateOfFirstPhotoOfYear (year date + increment) metadata


iso8601ToEpochSeconds : String -> SecondsSinceEpoch
iso8601ToEpochSeconds s =
    case fromISO8601 s of
        Err _ ->
            0

        Ok dateTime ->
            (dateTime
                |> toTimestamp
                |> inMilliseconds
                |> round
            )
                // 1000
