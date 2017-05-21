module Types exposing (..)

import List exposing (..)
import Dict exposing (..)
import Time.DateTime as DateTime exposing (..)
import Json.Decode as Decode exposing (..)
import Json.Encode as Encode exposing (..)
import Json.Helpers


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
        (dateTime { zero | year = 2012, month = 1, day = 1 })


type Msg
    = IncrementYear
    | DecrementYear
    | ShowPhotosForDate DateTime
    | ScrollPhotosFinished
    | DeletePhoto PhotoMetadata
    | DeletePhotoResult ( String, String )
    | ScanPhotosResult (List PhotoMetadata)
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


newYearsSeconds : Year -> SecondsSinceEpoch
newYearsSeconds year =
    toSeconds (dateTime { zero | year = year })



buildMeta : List PhotoMetadata -> MetadataDict
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
    dateOfFirstPhotoOfYear (year date + increment) metadata



-- Remove a photo from the model


removePhotoFromModel : FileName -> Model -> Model
removePhotoFromModel fileName model =
    { model | photoMetadata = removePhotoFromDict fileName model.photoMetadata }



-- remove the metadata entry of photo with fileName from the dict passed


removePhotoFromDict : FileName -> MetadataDict -> MetadataDict
removePhotoFromDict fileName dict =
    let
        removePhoto2 filename _ list =
            List.filter (\m -> m.fileName /= filename) list
    in
        dict
            |> Dict.map (removePhoto2 fileName)
            -- and remove empty dict entries
            |> Dict.filter (\_ metadata -> List.length metadata /= 0)



-- ======= Model Encoder / Decoder =============================================


modelToJson : Model -> String
modelToJson model =
    let
        metadataEncoder : PhotoMetadata -> Encode.Value
        metadataEncoder metadata =
            Encode.object
                [ ( "fileName", Encode.string metadata.fileName )
                , ( "dateCreated", Encode.string (toString metadata.dateCreated))
                ]

        metadataListEncoder : List PhotoMetadata -> Encode.Value
        metadataListEncoder metadataList =
            Encode.list ((List.map metadataEncoder) metadataList)

        metadataDictEncoder =
            Json.Helpers.encodeMap
                Encode.int
                metadataListEncoder
                model.photoMetadata

    in
        Encode.encode
            0
            (Encode.object
                [ ( "photoDir", Encode.string model.photoDir )
                , ( "error", Json.Helpers.maybeEncode Encode.string model.error )
                , ( "maxPicturesInADay", Encode.int model.maxPicturesInADay )
                , ( "photoMetadata", metadataDictEncoder )
                , ( "dateShown", Encode.string (toISO8601 model.dateShown) )
                ]
            )


jsonToModel : String -> Model
jsonToModel json =
    let
        dateTimeDecoder : Decoder DateTime
        dateTimeDecoder =
            Decode.string
                |> andThen (\val ->
                    case fromISO8601 val of
                        Err err -> fail err
                        Ok date -> succeed date)

        metadataDecoder =
            Decode.map2 PhotoMetadata
                (field "fileName" Decode.string)
                (field "dateCreated" Decode.int)

        metadataDictDecoder =
            Json.Helpers.decodeMap
                Decode.int
                (Decode.list metadataDecoder)

        modelDecoder =
            Decode.map5 Model
                (field "photoDir" Decode.string)
                (field "error" (Decode.nullable Decode.string))
                (field "maxPicturesInADay" Decode.int)
                (field "photoMetadata" metadataDictDecoder)
                (field "dateShown" dateTimeDecoder)
    in
        Decode.decodeString modelDecoder json
            |> Result.withDefault initialModel
