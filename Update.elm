module Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetAlbumsResult, UrlChange), update, fromHash)

import Maybe exposing (withDefault)
import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload), encodeUri)
import Json.Decode
import Time.DateTime exposing (toISO8601, fromISO8601)
import Navigation exposing (Location, modifyUrl)
import Regex exposing (regex, HowMany(AtMost), find)
import Types exposing (maxNbPictures, PhotoMetadata, AlbumName, FileName, RenamedPath, FilePath, AlbumHash(NoAlbum, AllAlbums, Album), PreviewHash(NoPreview, Preview), HashFields, DisplayDate(DateNotSpecified, Date, BadDate))
import Model exposing (Model, withPhotoShown, withMessage, withPhotos, withAlbumShown, removePhoto, updatePhotoPath, withAlbums, modelHash, toHash, albumShown)



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

        ScanPhotosResult (Ok photos) ->
            let
                newModel =
                    model
                        |> withPhotos photos
                        |> withMessage ""
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
            , case model |> albumShown of
                  NoAlbum ->
                      Cmd.none
                  AllAlbums ->
                      getAlbumPhotos ""
                  Album name ->
                      getAlbumPhotos name
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
                (Json.Decode.field "date" (Json.Decode.nullable Json.Decode.int))

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



fromHash : Location -> HashFields
fromHash location =
    let
        hashRegex =
            regex "^#([^:]*):(.*)$"

        matches =
            find (AtMost 1) hashRegex location.hash
    in
        case List.map .submatches matches of
            [ [ album, photo ] ] ->
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

            _ ->
                HashFields NoAlbum NoPreview


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
