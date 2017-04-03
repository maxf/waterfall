module Types exposing (..)

import Http exposing (..)
import List exposing (..)
import String exposing (toInt)
import Result exposing (withDefault)
import Dict exposing (..)
import Csv
import Time.Date as Date exposing (Date)

type alias Year =
    Int


type alias WeekNumber =
    Int


type alias DayOfWeek =
    Int


type alias DayOfMonth =
    Int


type alias Model =
    { year : Year -- TODO: not needed with dateShow below
    , error : String
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , dateShown : Maybe Date
    }


type alias PhotoMetadata =
    { fileName : String
    , dateCreated : String
    }


type Msg
    = Increment
    | Decrement
    | PhotoMetadataLoaded (Result Http.Error String)
    | ShowPhotosForDate Date


type alias MetadataDict
    = Dict String (List String)


maxNbPictures : MetadataDict -> Int
maxNbPictures dict =
    dict
        |> Dict.values
        |> List.foldl (\l a -> max (List.length l) a) 0


addFileName : String -> Maybe (List String) -> Maybe (List String)
addFileName filename dict =
    -- add filename to list
    case dict of
        Nothing -> Just [ filename ]
        Just list -> Just (filename :: list)


addToMetadataDict : List String -> MetadataDict -> MetadataDict
addToMetadataDict twoStrings dict =
--    ["name1", "date1"] -> Dict [] -> { "date1": ["name1"] }
    case twoStrings of
        [ filename, dateString ] ->
            Dict.update (String.left 10 dateString) (addFileName filename) dict
        _ ->
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
