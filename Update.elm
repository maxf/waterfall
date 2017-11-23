module Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetAlbumsResult, AlbumSelected, UrlChange), update, fromHash, toHash)

import String exposing (left)
import Maybe exposing (withDefault)
import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload), encodeUri)
import Json.Decode
import Time.DateTime exposing (toISO8601, fromISO8601)
import Navigation exposing (Location, modifyUrl)
import Regex exposing (regex, HowMany(AtMost), find)
import Types exposing (maxNbPictures, PhotoMetadata, AlbumName, FileName, RenamedPath, buildMeta, FilePath)
import Model exposing (Model, DisplayDate(Date, DateNotSpecified, BadDate), withDateShown, withPhotoShown, withMessage, withPhotoMetadata, withAlbumShown, withMaxPicturesInADay, removePhoto, updatePhotoPath, withAlbums, firstDateWithPhotos, hash)


type Msg
    = ScrollPhotosFinished
    | UserAskedToDeleteAPhoto FileName
    | UserAskedToRotateAPhoto Int FileName
    | UserClickedOnPhoto
    | PhotoWasDeleted (Result Http.Error String)
    | PhotoWasRotated (Result Http.Error RenamedPath)
    | ScanPhotosResult (Result Http.Error (List PhotoMetadata))
    | GetAlbumsResult (Result Http.Error (List String))
    | AlbumSelected (Maybe AlbumName)
    | UrlChange Location


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ScrollPhotosFinished ->
            ( model, Cmd.none )

        UserClickedOnPhoto ->
            ( model |> withPhotoShown Nothing, Cmd.none )

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
                        newModel |> hash
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

        AlbumSelected albumName ->
            ( model |> withAlbumShown albumName, scanPhotos albumName )

        UrlChange location ->
            let
                hashParams : HashFields
                hashParams =
                    fromHash location

                album =
                    if hashParams.albumName == "" then
                        Nothing
                    else
                        Just hashParams.albumName

                photo =
                    if hashParams.photoPath == "" then
                        Nothing
                    else
                        Just hashParams.photoPath
            in
                ( model
                    |> withDateShown hashParams.date
                    |> withPhotoShown photo
                    |> withAlbumShown album
                    |> withMessage ""
                , scanPhotos album
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


scanPhotos : Maybe AlbumName -> Cmd Msg
scanPhotos name =
    case name of
        Nothing ->
            Cmd.none

        Just dir ->
            let
                photoMetadataDecoder =
                    Json.Decode.map2
                        PhotoMetadata
                        (Json.Decode.field "path" Json.Decode.string)
                        (Json.Decode.field "date" Json.Decode.int)

                apiUrl =
                    "api/scan?dir=" ++ encodeUri dir

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
-- No albums (all photos)? #[photoname.jpg]:yyyy-mm-dd
-- Top-level album (when photos are in the top-level dir): #/[photoname.jpg]:yyyy-mm-dd


type alias HashFields =
    { albumName : AlbumName
    , photoPath : FilePath
    , date : DisplayDate
    }


fromHash : Location -> HashFields
fromHash location =
    let
        hashRegex =
            regex "^#([^:]*):([^:]*):(\\d{4}-\\d{2}-\\d{2})?$"

        matches =
            find (AtMost 1) hashRegex location.hash
    in
        case List.map .submatches matches of
            [ [ albumName, photoPath, ymd ] ] ->
                HashFields
                    (albumName |> withDefault "")
                    (photoPath |> withDefault "")
                    (dateFromYMD ymd)

            _ ->
                HashFields "" "" DateNotSpecified


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


toHash : Maybe AlbumName -> Maybe FilePath -> DisplayDate -> String
toHash album photo date =
    let
        hashDate =
            case date of
                Date d ->
                    d |> toISO8601 |> left 10

                _ ->
                    ""

        hashPhoto =
            photo |> Maybe.withDefault ""

        hashAlbum =
            album |> Maybe.withDefault ""
    in
        "#" ++ hashAlbum ++ ":" ++ hashPhoto ++ ":" ++ hashDate
