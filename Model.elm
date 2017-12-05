module Model
    exposing
        ( Model
        , initialModel
        , removePhotoShown
        , updateCurrentPhotoPath
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

import Types exposing (FileName, RenamedPath, AlbumName, HashFields, AlbumHash(NoAlbum, AllAlbums, Album), PhotoMetadata)
import List exposing (drop)
import List.Extra exposing (takeWhile, dropWhile)


type Model
    = Model InternalModel


type alias InternalModel =
    { albums : List AlbumName
    , albumShown : AlbumHash
    , photosBefore : List PhotoMetadata
    , photoShown : Maybe PhotoMetadata
    , photosAfter : List PhotoMetadata
    , message : String
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            []
            NoAlbum
            []
            Nothing
            []
            "Starting"
        )



-- Access functions


albumShown : Model -> AlbumHash
albumShown (Model model) =
    model.albumShown


photoShown : Model -> Maybe PhotoMetadata
photoShown (Model model) =
    model.photoShown


photos : Model -> List PhotoMetadata
photos (Model model) =
    case model.photoShown of
        Nothing ->
            model.photosBefore ++ model.photosAfter

        Just photo ->
            model.photosBefore ++ (photo :: model.photosAfter)


removePhotoShown : Model -> Model
removePhotoShown (Model model) =
    Model
        { model
            | photoShown = Nothing
        }


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


type alias PhotoSplit =
    { left : List PhotoMetadata
    , middle : PhotoMetadata
    , right : List PhotoMetadata
    }


splitAt : FileName -> List PhotoMetadata -> Maybe PhotoSplit
splitAt path list =
    case List.filter (\p -> p.relativeFilePath == path) list of
        [ singlePhoto ] ->
            Just
                (PhotoSplit
                    (takeWhile (\p -> p.relativeFilePath /= path) list)
                    singlePhoto
                    (drop 1 (dropWhile (\p -> p.relativeFilePath /= path) list))
                )

        _ ->
            Nothing


withPhotoShown : Maybe FileName -> Model -> Model
withPhotoShown filename (Model model) =
    case filename of
        Nothing ->
            -- photo has been closed
            Model
                { model
                    | photosBefore = Model model |> photos
                    , photosAfter = []
                    , photoShown = Nothing
                }

        Just name ->
            let
                newSplit =
                    splitAt name (Model model |> photos)
            in
                case newSplit of
                    Nothing ->
                        -- if 2 or more photos have the same filename
                        Model model

                    Just split ->
                        Model
                            { model
                                | photosBefore = split.left
                                , photosAfter = split.right
                                , photoShown = Just split.middle
                            }


withMessage : String -> Model -> Model
withMessage message (Model model) =
    Model { model | message = message }


withPhotos : List PhotoMetadata -> Model -> Model
withPhotos metadata (Model model) =
    Model { model | photosBefore = metadata }



-- Change the path of a photo

-- TODO: don't need RenamedPath anymore
updateCurrentPhotoPath : RenamedPath -> Model -> Model
updateCurrentPhotoPath renamedPath model =
    case model |> photoShown of
        Nothing ->
            model

        Just _ ->
            model |> withPhotoShown (Just renamedPath.new)


modelHash : Model -> String
modelHash (Model model) =
    toHash (HashFields model.albumShown (Maybe.map .relativeFilePath model.photoShown))


toHash : HashFields -> String
toHash hash =
    let
        photo =
            hash.preview |> Maybe.withDefault ""
    in
        case hash.album of
            NoAlbum ->
                ""

            AllAlbums ->
                "#:" ++ photo

            Album path ->
                "#" ++ path ++ ":" ++ photo
