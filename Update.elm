module Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetAlbumsResult, UrlChange), update, fromHash)

import Maybe exposing (withDefault)
import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload), encodeUri)
import Json.Decode
import Time.DateTime exposing (toISO8601, fromISO8601)
import Navigation exposing (Location, modifyUrl)
import Regex exposing (regex, HowMany(AtMost), find)
import Types exposing (maxNbPictures, PhotoMetadata, AlbumName, FileName, RenamedPath, buildMeta, FilePath, AlbumHash(NoAlbum, AllAlbums, Album), PreviewHash(NoPreview, Preview), HashFields, DisplayDate(DateNotSpecified, Date, BadDate))
import Model exposing (Model, withDateShown, withPhotoShown, withMessage, withPhotoMetadata, withAlbumShown, withMaxPicturesInADay, removePhoto, updatePhotoPath, withAlbums, firstDateWithPhotos, modelHash, toHash)


type Msg
    = ScrollPhotosFinished
    | UserAskedToDeleteAPhoto FileName
    | UserAskedToRotateAPhoto Int FileName
    | UserClickedOnPhoto
    | PhotoWasDeleted (Result Http.Error String)
    | PhotoWasRotated (Result Http.Error RenamedPath)
    | ScanPhotosResult (Result Http.Error (List PhotoMetadata))
    | GetAlbumsResult (Result Http.Error (List String))
    | UrlChange Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ScrollPhotosFinished ->
            ( model, Cmd.none )

        UserClickedOnPhoto ->
            ( model |> withPhotoShown NoPreview, Cmd.none )

        UserAskedToDeleteAPhoto fileName ->
            ( model, deletePhoto fileName )

        UserAskedToRotateAPhoto angle fileName ->
            ( model, rotatePhoto angle fileName )

        PhotoWasDeleted (Ok deletedFilePath) ->
            if deletedFilePath /= "" then
                let
                    newModel =
                        model |> removePhoto deletedFilePath

                    newHash =
                        newModel |> modelHash
                in
                    ( newModel, modifyUrl newHash )
            else
                ( model, Cmd.none )

        PhotoWasDeleted (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        PhotoWasRotated (Ok renamedPath) ->
            ( model |> updatePhotoPath renamedPath, Cmd.none )

        PhotoWasRotated (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        ScanPhotosResult (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        ScanPhotosResult (Ok metadataList) ->
            let
                metadata =
                    buildMeta metadataList

                newModel =
                    model
                        |> withPhotoMetadata metadata
                        |> withMessage ""
                        |> withMaxPicturesInADay (maxNbPictures metadata)
                        |> withDateShown (Date (firstDateWithPhotos metadata))
            in
                ( newModel
                , Task.attempt (\_ -> ScrollPhotosFinished) (Dom.Scroll.toTop "photos")
                )

        GetAlbumsResult (Err _) ->
            ( model |> withMessage "Error getting albums"
            , Cmd.none
            )

        GetAlbumsResult (Ok albumList) ->
            ( model
                |> withAlbums albumList
                |> withMessage ""
            , Cmd.none
            )

        UrlChange location ->
            let
                hashParams : HashFields
                hashParams =
                    fromHash location

                cmd : Cmd Msg
                cmd =
                    case hashParams.album of
                        NoAlbum ->
                            Cmd.none
                        AllAlbums ->
                            getAlbumPhotos ""
                        Album name ->
                            getAlbumPhotos name
            in
                ( model
                    |> withDateShown hashParams.date
                    |> withPhotoShown hashParams.preview
                    |> withAlbumShown hashParams.album
                    |> withMessage ""
                , cmd
                )



-- Misc


deletePhoto : FileName -> Cmd Msg
deletePhoto fileName =
    let
        request =
            Http.get
                ("api/delete?photo=" ++ encodeUri fileName)
                Json.Decode.string
    in
        Http.send PhotoWasDeleted request


rotatePhoto : Int -> FileName -> Cmd Msg
rotatePhoto angle fileName =
    let
        rotatedDecoder =
            Json.Decode.map2
                RenamedPath
                (Json.Decode.field "old" Json.Decode.string)
                (Json.Decode.field "new" Json.Decode.string)

        request =
            Http.get
                ("api/rotate?angle=" ++ toString angle ++ "&photo=" ++ encodeUri fileName)
                rotatedDecoder
    in
        Http.send PhotoWasRotated request


getAlbumPhotos : String -> Cmd Msg
getAlbumPhotos albumName =
    let
        photoMetadataDecoder =
            Json.Decode.map2
                PhotoMetadata
                (Json.Decode.field "path" Json.Decode.string)
                (Json.Decode.field "date" Json.Decode.int)

        apiUrl =
            "api/scan?dir=" ++ encodeUri albumName

        request =
            Http.get apiUrl (Json.Decode.list photoMetadataDecoder)

    in
        Http.send ScanPhotosResult request


errorMessage : Http.Error -> String
errorMessage error =
    case error of
        BadUrl url ->
            "Bad URL: " ++ url

        Timeout ->
            "Timeout"

        NetworkError ->
            "Network error"

        BadStatus _ ->
            "Bad status "

        BadPayload s _ ->
            "Bad payload: " ++ s



-- URL functions
-- Hashes look like this
-- (no hash) -> initial state. Ask for album path
-- #/al/bum/Path::
-- #/al/bum/Path::yyyy-mm-dd
-- #/al/bum/Path:photo/name.jpg:
-- #/al/bum/Path:photo/name.jpg:yyyy-mm-dd
-- #/:photoname.jpg:
-- #/:photoname.jpg:yyyy-mm-dd
-- #/::yyyy-mm-dd
-- Albums include subdirectories. A photo might be part of multiple albums
-- #/al/bum/Path:photo/path.jpg:yyyy-mm-dd
-- No albums (all photos)? #:[photoname.jpg]:yyyy-mm-dd
-- Top-level album (when photos are in the top-level dir): #/[photoname.jpg]:yyyy-mm-dd


-- [nothing] -> (Nothing, Nothing, NoDateSelected)   -- start state, nothing shown
-- #:: -> (Just '', Nothing, NoDateSelected)   -- top-level albums, no photo previewed
--
-- #a:b:2012-12-12 -> (Just 'a', Just 'b', Date ...)
-- #a::2012-12-12 -> (Just 'a', Nothing, Date ...)




fromHash : Location -> HashFields
fromHash location =
    let
        hashRegex =
            regex "^#([^:]*):([^:]*):(\\d{4}-\\d{2}-\\d{2})?$"

        matches =
            find (AtMost 1) hashRegex location.hash
    in
        case List.map .submatches matches of
            [ [ album, photo, date ] ] ->
                HashFields
                    (case album of
                        Nothing ->
                            NoAlbum
                        Just name ->
                            if name == "" then AllAlbums else Album name)
                    (case photo of
                        Nothing ->
                            NoPreview
                        Just path ->
                            if path == "" then NoPreview else Preview path)
                    (dateFromYMD date)

            _ ->
                HashFields NoAlbum NoPreview DateNotSpecified


dateFromYMD : Maybe String -> DisplayDate
dateFromYMD s =
    case s of
        Nothing ->
            DateNotSpecified

        Just yyyymmdd ->
            case yyyymmdd ++ "T00:00:00Z" |> fromISO8601 of
                Ok date ->
                    Date date

                Err _ ->
                    BadDate
