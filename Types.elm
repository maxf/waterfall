module Types exposing (..)

import List exposing (..)
import String exposing (toInt, split)
import Dict exposing (..)
import Regex exposing (..)
import Time.DateTime as DateTime exposing (..)
import Json.Decode as Decode exposing (..)
import Json.Encode as Encode


type alias Year =
    Int


type alias WeekNumber =
    Int


type alias DayOfWeek =
    Int


type alias DayOfMonth =
    Int


type alias FileName =
    String


type alias ErrorMessage =
    String


type alias SecondsSinceEpoch =
    Int


type alias DirectoryName =
    String


type alias Model =
    { photoDir : DirectoryName
    , error : Maybe ErrorMessage
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , dateShown : DateTime
    }


initialModel : Model
initialModel =
    Model
        ""
        Nothing
        0
        Dict.empty
        (dateTime { zero | year = 2016, month = 1, day = 1 })


type Msg
    = IncrementYear
    | DecrementYear
    | ShowPhotosForDate DateTime
    | ScrollPhotosFinished
    | DeletePhoto PhotoMetadata
    | DeletePhotoResult String
    | ScanPhotosResult (List String)
    | RequestPhotoDir
    | RequestPhotoDirResult (List String)
    | ModelSaved Bool
    | ModelLoaded String


type alias PhotoMetadata =
    { fileName : FileName
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


stringToMetadata : String -> Result ErrorMessage PhotoMetadata
stringToMetadata metadataString =
    let
        matches =
            Regex.find All (regex "^(.*)__([0-9]+)$") metadataString
    in
        case matches of
            [ match ] ->
                case match.submatches of
                    [ Just fileName, Just epochDateCreated ] ->
                        case String.toInt epochDateCreated of
                            Ok seconds ->
                                Ok
                                    (PhotoMetadata fileName seconds)

                            Err err ->
                                Err err

                    _ ->
                        Err ("Couldn't parse " ++ metadataString)

            _ ->
                Err ("No matches for " ++ metadataString)


addToMetadataDict : String -> MetadataDict -> MetadataDict
addToMetadataDict metadataString dict =
    let
        newMetadata =
            stringToMetadata metadataString
    in
        case newMetadata of
            Ok metadata ->
                Dict.update
                    (roundToStartOfDay metadata.dateCreated)
                    (addPhotoMetadata metadata)
                    dict

            Err message ->
                dict


yearOfDate : SecondsSinceEpoch -> Year
yearOfDate seconds =
    addSeconds seconds epoch |> year


dateToString : DateTime -> String
dateToString date =
    ((date |> day |> toString)
        ++ "/"
        ++ (date |> month |> toString)
        ++ "/"
        ++ (date |> year |> toString)
    )


toSeconds : DateTime -> SecondsSinceEpoch
toSeconds date =
    (round (toTimestamp date)) // 1000


newYearsSeconds : Year -> SecondsSinceEpoch
newYearsSeconds year =
    toSeconds (dateTime { zero | year = year })



-- format of string : "photo name.jpg__29482348"
-- the number is the epoch of the photo's takenDate


buildMeta : List String -> MetadataDict
buildMeta list =
    list
        |> List.foldl addToMetadataDict Dict.empty


dateOfFirstPhotoOfYear : Year -> MetadataDict -> DateTime
dateOfFirstPhotoOfYear year metadata =
    let
        firstPhotoSeconds =
            metadata
                |> keys
                |> List.filter (\key -> yearOfDate key == year)
                |> List.sort
                |> List.head
    in
        case firstPhotoSeconds of
            Nothing ->
                dateTime { zero | year = year }

            Just seconds ->
                addSeconds seconds epoch



-- Return the date of the first picture of the incremented date


addYear : Year -> MetadataDict -> DateTime -> DateTime
addYear increment metadata date =
    dateOfFirstPhotoOfYear ((year date) + increment) metadata



-- Remove a photo from the model


removePhotoFromModel : FileName -> Model -> Model
removePhotoFromModel fileName model =
    { model | photoMetadata = removePhotoFromDict fileName model.photoMetadata }



-- remove the metadata entry of photo with fileName from the dict passed


removePhotoFromDict : FileName -> MetadataDict -> MetadataDict
removePhotoFromDict fileName dict =
    let
        removePhoto2 fileName date list =
            List.filter (\m -> m.fileName /= fileName) list
    in
        dict
            |> Dict.map (removePhoto2 fileName)
            -- and remove empty dict entries
            |> Dict.filter (\date metadata -> List.length metadata /= 0)



-- =============== addFileNames ================================================
-- add a dict entry:
--   (key, [{file1:, date1:}, {file2:, date2:} ])  as '(key, metadata)'
-- to a list of strings
--   ["file3__date3", "file4__date4", ...] as 'acc'
-- returning:
--   ["file1_date1, "file2__date2", "file3__date3", "file4__date4"]


addFileNames :
    SecondsSinceEpoch
    -> List PhotoMetadata
    -> List String
    -> List String
addFileNames key metadata acc =
    let
        newEntryNames =
            List.map (\m -> m.fileName ++ "__" ++ (toString m.dateCreated)) metadata
    in
        List.concat [ newEntryNames, acc ]


modelToString : Model -> String
modelToString model =
    let
        metadataAsStrings : List String
        metadataAsStrings =
            Dict.foldl addFileNames [] model.photoMetadata

        encodedMetadata : Encode.Value
        encodedMetadata =
            Encode.list (List.map Encode.string metadataAsStrings)
    in
        Encode.encode
            0
            (Encode.object
                [ ( "photoDir", Encode.string model.photoDir )
                , ( "error", Encode.string (model.error |> Maybe.withDefault "") )
                , ( "maxPicturesInADay", Encode.int model.maxPicturesInADay )
                , ( "photoMetadata", encodedMetadata )
                , ( "dateShown", Encode.string (toISO8601 model.dateShown) )
                ]
            )


type alias ModelJson =
    { photoDir : String
    , error : String
    , maxPicturesInADay : Int
    , photoMetadata : List String
    , dateShown : String
    }


jsonToModel : String -> Model
jsonToModel json =
    let
        modelJson =
            Decode.decodeString
                (Decode.map5 ModelJson
                    (field "photoDir" Decode.string)
                    (field "error" Decode.string) -- shoudl use nullable
                    (field "maxPicturesInADay" Decode.int)
                    (field "photoMetadata" (Decode.list Decode.string))
                    (field "dateShown" Decode.string)
                )
                json
                |> Result.withDefault (ModelJson "" "" 0 [] "")
    in
        Model
            modelJson.photoDir
            Nothing -- (Just modelJson.error) Should use nullable
            modelJson.maxPicturesInADay
            (buildMeta modelJson.photoMetadata)
            (fromISO8601 modelJson.dateShown |> Result.withDefault epoch)
