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
        , nextPhoto
        , prevPhoto
        , hash
        , withPhotoShown
        , withAlbums
        , withMessage
        , withPhotos
        , withAlbumShown
        )

import Types exposing (PhotoPath, AlbumDir, Photo)
import List exposing (drop, head, foldl)
import List.Extra exposing (takeWhile, dropWhile)
import Http exposing (encodeUri)


type Model
    = Model InternalModel


type alias InternalModel =
    { albums : List AlbumDir
    , albumShown : Maybe AlbumDir
    , photosBefore : List Photo
    , photoShown : Maybe Photo
    , photosAfter : List Photo
    , message : String
    }


initialModel : Model
initialModel =
    Model
        (InternalModel
            []
            Nothing
            []
            Nothing
            []
            "Starting"
        )



-- Access functions


albumShown : Model -> Maybe AlbumDir
albumShown (Model model) =
    model.albumShown


photoShown : Model -> Maybe Photo
photoShown (Model model) =
    model.photoShown


photos : Model -> List Photo
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


albums : Model -> List AlbumDir
albums (Model model) =
    model.albums


withAlbumShown : Maybe AlbumDir -> Model -> Model
withAlbumShown album (Model model) =
    Model { model | albumShown = album }


withAlbums : List AlbumDir -> Model -> Model
withAlbums albumList (Model model) =
    Model { model | albums = albumList }


type alias PhotoSplit =
    { left : List Photo
    , middle : Photo
    , right : List Photo
    }


splitAt : PhotoPath -> List Photo -> Maybe PhotoSplit
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
            -- either the photo asked wasn't in the list, or there were multiple ones
            -- with the same filename
            Nothing


withPhotoShown : Maybe PhotoPath -> Model -> Model
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
                        Model { model | photoShown = Nothing }

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


photoOrder : Photo -> Photo -> Order
photoOrder photoA photoB =
    let
        timestampA =
            photoA.dateCreated |> Maybe.withDefault 0

        timestampB =
            photoB.dateCreated |> Maybe.withDefault 0
    in
        if timestampA == 0 && timestampB == 0 then
            compare photoA.relativeFilePath photoB.relativeFilePath
        else
            compare timestampA timestampB



-- Add photos to a model
-- and sort the photos by timeStamp if present, otherwise filename


withPhotos : List Photo -> Model -> Model
withPhotos photos (Model model) =
    Model
        { model | photosBefore = (List.sortWith photoOrder photos) }



-- Change the path of a photo


updateCurrentPhotoPath : String -> Model -> Model
updateCurrentPhotoPath newPath (Model model) =
    case model.photoShown of
        Nothing ->
            Model model

        Just oldPhoto ->
            let
                newPhoto =
                    { oldPhoto | relativeFilePath = newPath }
            in
                Model { model | photoShown = Just newPhoto }


hash : Model -> String
hash model =
    case model |> albumShown of
        Nothing ->
            ""

        Just albumName ->
            case model |> photoShown of
                Nothing ->
                    "#" ++ encodeUri albumName

                Just photo ->
                    "#" ++ encodeUri albumName ++ ":" ++ encodeUri photo.relativeFilePath


nextPhoto : Model -> Maybe Photo
nextPhoto (Model model) =
    head model.photosAfter


prevPhoto : Model -> Maybe Photo
prevPhoto (Model model) =
    foldl (Just >> always) Nothing model.photosBefore
