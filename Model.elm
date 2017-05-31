module Model
    exposing
        ( Model
        , initialModel
        , removePhoto
        , dateShown
        , photoMetadata
        , photoDir
        , error
        , toJson
        , fromJson
        , withDateShown
        , withError
        , withPhotoMetadata
        , withPhotoDir
        , withMaxPicturesInADay
        )

import Types exposing (DirectoryName, ErrorMessage, MetadataDict, FileName, PhotoMetadata, JsonString)
import Time.DateTime exposing (DateTime, dateTime, zero, toISO8601, fromISO8601)
import Json.Decode as Decode exposing (Decoder, andThen, fail, succeed, field)
import Json.Encode as Encode
import Json.Helpers
import Dict


type Model
    = Model InternalModel


type alias InternalModel =
    { photoDir : DirectoryName
    , error : Maybe ErrorMessage
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , dateShown : DateTime
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            ""
            Nothing
            0
            Dict.empty
            (dateTime { zero | year = 2012, month = 1, day = 1 })
        )



-- Access functions


photoDir : Model -> DirectoryName
photoDir (Model model) =
    model.photoDir


dateShown : Model -> DateTime
dateShown (Model model) =
    model.dateShown


photoMetadata : Model -> MetadataDict
photoMetadata (Model model) =
    model.photoMetadata


error : Model -> Maybe String
error (Model model) =
    model.error


withPhotoDir : DirectoryName -> Model -> Model
withPhotoDir dir (Model model) =
    Model { model | photoDir = dir }


withDateShown : DateTime -> Model -> Model
withDateShown date (Model model) =
    Model { model | dateShown = date }


withError : Maybe ErrorMessage -> Model -> Model
withError message (Model model) =
    Model { model | error = message }


withPhotoMetadata : MetadataDict -> Model -> Model
withPhotoMetadata metadata (Model model) =
    Model { model | photoMetadata = metadata }


withMaxPicturesInADay : Int -> Model -> Model
withMaxPicturesInADay maxpics (Model model) =
    Model { model | maxPicturesInADay = maxpics }



-- Remove a photo from the model


removePhoto : FileName -> Model -> Model
removePhoto fileName (Model model) =
    Model { model | photoMetadata = removePhotoFromDict fileName model.photoMetadata }



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


toJson : Model -> JsonString
toJson (Model model) =
    let
        metadataEncoder : PhotoMetadata -> Encode.Value
        metadataEncoder metadata =
            Encode.object
                [ ( "fileName", Encode.string metadata.fileName )
                , ( "dateCreated", Encode.int metadata.dateCreated )
                ]

        metadataListEncoder : List PhotoMetadata -> Encode.Value
        metadataListEncoder metadataList =
            Encode.list (List.map metadataEncoder metadataList)

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


fromJson : JsonString -> Result String Model
fromJson json =
    let
        modelInternalResult =
            fromJsonInternal json
    in
        case modelInternalResult of
            Err err ->
                Err err

            Ok internalModel ->
                Ok (Model internalModel)


fromJsonInternal : JsonString -> Result String InternalModel
fromJsonInternal json =
    let
        dateTimeDecoder : Decoder DateTime
        dateTimeDecoder =
            Decode.string
                |> andThen
                    (\val ->
                        case fromISO8601 val of
                            Err err ->
                                fail err

                            Ok date ->
                                succeed date
                    )

        metadataDecoder =
            Decode.map2 PhotoMetadata
                (field "fileName" Decode.string)
                (field "dateCreated" Decode.int)

        metadataDictDecoder =
            Json.Helpers.decodeMap
                Decode.int
                (Decode.list metadataDecoder)

        modelDecoder : Decode.Decoder InternalModel
        modelDecoder =
            Decode.map5 InternalModel
                (field "photoDir" Decode.string)
                (field "error" (Decode.nullable Decode.string))
                (field "maxPicturesInADay" Decode.int)
                (field "photoMetadata" metadataDictDecoder)
                (field "dateShown" dateTimeDecoder)
    in
        Decode.decodeString modelDecoder json
