module Model
    exposing
        ( Model
        , initialModel
        , removePhoto
        , dateShown
        , photoMetadata
        , photoDir
        , error
        , users
        , withDateShown
        , withUsers
        , withError
        , withPhotoMetadata
        , withPhotoDir
        , withMaxPicturesInADay
        , lastDateWithPhotos
        )

import Types exposing (DirectoryName, ErrorMessage, MetadataDict, FileName, PhotoMetadata, JsonString, UserName)
import Time.DateTime exposing (DateTime, dateTime, zero, toISO8601, fromISO8601, fromTimestamp)
import Dict


type Model
    = Model InternalModel


type alias InternalModel =
    { photoDir : DirectoryName
    , users : List UserName
    , error : Maybe ErrorMessage
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , dateShown : Maybe DateTime
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            ""
            []
            Nothing
            0
            Dict.empty
            Nothing
        )



-- Access functions


photoDir : Model -> DirectoryName
photoDir (Model model) =
    model.photoDir


dateShown : Model -> Maybe DateTime
dateShown (Model model) =
    model.dateShown


photoMetadata : Model -> MetadataDict
photoMetadata (Model model) =
    model.photoMetadata


error : Model -> Maybe String
error (Model model) =
    model.error


users : Model -> List UserName
users (Model model) =
    model.users


withPhotoDir : DirectoryName -> Model -> Model
withPhotoDir dir (Model model) =
    Model { model | photoDir = dir }


withUsers : List UserName -> Model -> Model
withUsers userList (Model model) =
    Model { model | users = userList }


withDateShown : Maybe DateTime -> Model -> Model
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
            List.filter (\m -> m.relativeFilePath /= filename) list
    in
        dict
            |> Dict.map (removePhoto2 fileName)
            -- and remove empty dict entries
            |> Dict.filter (\_ metadata -> List.length metadata /= 0)


lastDateWithPhotos : MetadataDict -> DateTime
lastDateWithPhotos dict =
    dict
        |> Dict.keys
        |> List.reverse
        |> List.head
        -- If no photos, pick some random date:
        |> Maybe.withDefault 1503957375
        |> (*) 1000
        |> toFloat
        |> fromTimestamp
