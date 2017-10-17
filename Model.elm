module Model
    exposing
        ( Model
        , DisplayDate(Date, DateNotSpecified, BadDate)
        , initialModel
        , removePhoto
        , dateShown
        , photoShown
        , photoMetadata
        , photoDir
        , error
        , users
        , withDateShown
        , withPhotoShown
        , withUsers
        , withError
        , withPhotoMetadata
        , withPhotoDir
        , withMaxPicturesInADay
        , lastDateWithPhotos
        )

import Types exposing (DirectoryName, ErrorState(NoError), MetadataDict, FileName, UserName)
import Time.DateTime exposing (DateTime, fromTimestamp)
import Dict


type Model
    = Model InternalModel


type DisplayDate
    = Date DateTime
    | DateNotSpecified
    | BadDate


type alias InternalModel =
    { photoDir : DirectoryName
    , users : List UserName
    , error : ErrorState
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , dateShown : DisplayDate
    , photoShown : Maybe FileName
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            ""
            []
            NoError
            0
            Dict.empty
            DateNotSpecified
            Nothing
        )



-- Access functions


photoDir : Model -> DirectoryName
photoDir (Model model) =
    model.photoDir


dateShown : Model -> DisplayDate
dateShown (Model model) =
    model.dateShown


photoShown : Model -> Maybe FileName
photoShown (Model model) =
    model.photoShown


photoMetadata : Model -> MetadataDict
photoMetadata (Model model) =
    model.photoMetadata


error : Model -> ErrorState
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


withDateShown : DisplayDate -> Model -> Model
withDateShown date (Model model) =
    Model { model | dateShown = date }


withPhotoShown : Maybe FileName -> Model -> Model
withPhotoShown filename (Model model) =
    Model { model | photoShown = filename }


withError : ErrorState -> Model -> Model
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
