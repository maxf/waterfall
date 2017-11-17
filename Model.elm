module Model
    exposing
        ( Model
        , DisplayDate(Date, DateNotSpecified, BadDate)
        , initialModel
        , removePhoto
        , updatePhotoPath
        , dateShown
        , photoShown
        , photoMetadata
        , photoDir
        , message
        , users
        , withDateShown
        , withPhotoShown
        , withUsers
        , withMessage
        , withPhotoMetadata
        , withPhotoDir
        , withMaxPicturesInADay
        , lastDateWithPhotos
        )

import Types exposing (DirectoryName, MetadataDict, FileName, UserName, RenamedPath)
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
    , message : String
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
            "Starting"
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


message : Model -> String
message (Model model) =
    model.message


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


withMessage : String -> Model -> Model
withMessage message (Model model) =
    Model { model | message = message }


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



-- Change the path of a photo


updatePhotoPath : RenamedPath -> Model -> Model
updatePhotoPath renamedPath model =
    let
        replacePath path photo =
            if photo.relativeFilePath == path.old then
                { photo | relativeFilePath = path.new }
            else
                photo

        updateInList path _ list =
            List.map (replacePath path) list

        newMetadata : MetadataDict
        newMetadata =
            Dict.map (updateInList renamedPath) (photoMetadata model)
    in
        model
            |> withPhotoMetadata newMetadata
            |> withPhotoShown (Just renamedPath.new)



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
