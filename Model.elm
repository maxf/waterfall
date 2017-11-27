module Model
    exposing
        ( Model
        , initialModel
        , removePhoto
        , updatePhotoPath
        , photoShown
        , photos
        , albumShown
        , message
        , albums
        , toHash
        , modelHash
        , withPhotoShown
        , withAlbums
        , withMessage
        , withPhotos
        , withAlbumShown
        )

import Types exposing (FileName, RenamedPath, FilePath, AlbumName, HashFields, DisplayDate(DateNotSpecified, Date, BadDate), AlbumHash(NoAlbum, AllAlbums, Album), PreviewHash(NoPreview, Preview), PhotoMetadata)
import Time.DateTime exposing (DateTime, fromTimestamp, toISO8601)
import String exposing (left)


type Model
    = Model InternalModel


type alias InternalModel =
    { albums : List AlbumName
    , message : String
    , photos : List PhotoMetadata
    , albumShown : AlbumHash
    , photoShown : PreviewHash
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            []
            "Starting"
            []
            NoAlbum
            NoPreview
        )



-- Access functions


albumShown : Model -> AlbumHash
albumShown (Model model) =
    model.albumShown


photoShown : Model -> PreviewHash
photoShown (Model model) =
    model.photoShown


photos : Model -> List PhotoMetadata
photos (Model model) =
    model.photos


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


withPhotoShown : PreviewHash -> Model -> Model
withPhotoShown filename (Model model) =
    Model { model | photoShown = filename }


withMessage : String -> Model -> Model
withMessage message (Model model) =
    Model { model | message = message }


withPhotos : List PhotoMetadata -> Model -> Model
withPhotos metadata (Model model) =
    Model { model | photos = metadata }



-- Remove a photo from the model


removePhoto : FileName -> Model -> Model
removePhoto fileName (Model model) =
    let
        filterFn : PhotoMetadata -> Bool
        filterFn photo =
            photo.relativeFilePath /= fileName
    in
        Model
            { model
                | photos = List.filter filterFn model.photos
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

        newPhotos : List PhotoMetadata
        newPhotos =
            List.map (replacePath renamedPath) (photos model)
    in
        model
            |> withPhotos newPhotos
            |> withPhotoShown (Preview renamedPath.new)



modelHash : Model -> String
modelHash (Model model) =
    toHash (HashFields model.albumShown model.photoShown)


toHash : HashFields -> String
toHash hash =
    let
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
                "#:" ++ photo

            Album path ->
                "#" ++ path ++ ":" ++ photo
