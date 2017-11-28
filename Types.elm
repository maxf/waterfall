module Types exposing (DirectoryPath, PhotoMetadata, Year, Month, toSeconds, SecondsSinceEpoch, MetadataDict, WeekNumber, DayOfWeek, dateToString, addYear, dateOfFirstPhotoOfYear, maxNbPictures, FileName, JsonString, iso8601ToEpochSeconds, RenamedPath, FilePath, AlbumName, AlbumHash(NoAlbum, AllAlbums, Album), PreviewHash(NoPreview, Preview), HashFields, DisplayDate(DateNotSpecified, Date, BadDate))

import Dict exposing (Dict, keys)
import Time.DateTime exposing (DateTime, dateTime, zero, epoch, year, month, day, addSeconds, toTimestamp, fromISO8601)
import Time exposing (inMilliseconds)


type alias Year =
    Int


type alias Month =
    Int


type alias WeekNumber =
    Int


type alias DayOfWeek =
    Int



-- eg "hello.jpg"


type alias FileName =
    String



-- eg "foo/bar/hello.jpg"


type alias FilePath =
    String



-- eg "foo/bar"


type alias DirectoryPath =
    String


type alias AlbumName =
    DirectoryPath


type alias SecondsSinceEpoch =
    Int


type alias JsonString =
    String


type alias PhotoMetadata =
    { relativeFilePath : FileName
    , dateCreated : Maybe SecondsSinceEpoch
    }


type alias MetadataDict =
    Dict SecondsSinceEpoch (List PhotoMetadata)


type alias RenamedPath =
    { old : FileName
    , new : FileName
    }


type AlbumHash
    = NoAlbum
    | AllAlbums
    | Album AlbumName


type PreviewHash
    = NoPreview
    | Preview FilePath


type DisplayDate
    = Date DateTime
    | DateNotSpecified
    | BadDate

type alias HashFields =
    { album : AlbumHash
    , preview : PreviewHash
    }


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

        Ok date ->
            (date
                |> toTimestamp
                |> inMilliseconds
                |> round
            )
                // 1000
