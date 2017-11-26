module Model
    exposing
        ( Model
        , initialModel
        , removePhoto
        , updatePhotoPath
        , dateShown
        , photoShown
        , photoMetadata
        , albumShown
        , message
        , albums
        , toHash
        , modelHash
        , withDateShown
        , withPhotoShown
        , withAlbums
        , withMessage
        , withPhotoMetadata
        , withAlbumShown
        , withMaxPicturesInADay
        , lastDateWithPhotos
        , firstDateWithPhotos
        )

import Types exposing (MetadataDict, FileName, RenamedPath, FilePath, AlbumName, HashFields, DisplayDate(DateNotSpecified, Date, BadDate), AlbumHash(NoAlbum, AllAlbums, Album), PreviewHash(NoPreview, Preview))
import Time.DateTime exposing (DateTime, fromTimestamp, toISO8601)
import String exposing (left)
import Dict


type Model
    = Model InternalModel


type alias InternalModel =
    { albums : List AlbumName
    , message : String
    , maxPicturesInADay : Int
    , photoMetadata : MetadataDict
    , albumShown : AlbumHash
    , dateShown : DisplayDate
    , photoShown : PreviewHash
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            []
            "Starting"
            0
            Dict.empty
            NoAlbum
            DateNotSpecified
            NoPreview
        )



-- Access functions


albumShown : Model -> AlbumHash
albumShown (Model model) =
    model.albumShown


dateShown : Model -> DisplayDate
dateShown (Model model) =
    model.dateShown


photoShown : Model -> PreviewHash
photoShown (Model model) =
    model.photoShown


photoMetadata : Model -> MetadataDict
photoMetadata (Model model) =
    model.photoMetadata


message : Model -> String
message (Model model) =
    model.message


albums : Model -> List AlbumName
albums (Model model) =
    model.albums


withAlbumShown : AlbumHash -> Model -> Model
withAlbumShown album (Model model) =
    Model { model | albumShown = album }


withAlbums : List AlbumName -> Model -> Model
withAlbums albumList (Model model) =
    Model { model | albums = albumList }


withDateShown : DisplayDate -> Model -> Model
withDateShown date (Model model) =
    Model { model | dateShown = date }


withPhotoShown : PreviewHash -> Model -> Model
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
    Model
        { model
            | photoMetadata = removePhotoFromDict fileName model.photoMetadata
            , photoShown = NoPreview
        }



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
            |> withPhotoShown (Preview renamedPath.new)



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


firstDateWithPhotos : MetadataDict -> DateTime
firstDateWithPhotos dict =
    dict
        |> Dict.keys
        |> List.head
        -- If no photos, pick some random date:
        |> Maybe.withDefault 1503957375
        |> (*) 1000
        |> toFloat
        |> fromTimestamp


modelHash : Model -> String
modelHash (Model model) =
    toHash (HashFields model.albumShown model.photoShown model.dateShown)


toHash : HashFields -> String
toHash hash =
    let
        date =
            case hash.date of
                Date d ->
                    d |> toISO8601 |> left 10

                _ ->
                    ""

        photo =
            case hash.preview of
                NoPreview ->
                    ""
                Preview path ->
                    path
    in
        case hash.album of
            NoAlbum ->
                ""

            AllAlbums ->
                "#:" ++ photo ++ ":" ++ date

            Album path ->
                "#" ++ path ++ ":" ++ photo ++ ":" ++ date
