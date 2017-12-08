module Update exposing (Msg(UserChangedAlbum, UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedPhoto, UserClickedThumbnail, PhotoWasDeleted, ScanPhotosResult, GetAlbumsResult, UrlHasChanged), update)

import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload), encodeUri)
import Json.Decode
import Navigation exposing (Location, modifyUrl, newUrl)
import Types exposing (PhotoMetadata, FileName, AlbumName)
import Model exposing (Model, withPhotoShown, withMessage, withPhotos, removePhotoShown, updateCurrentPhotoPath, withAlbums, hash, albumShown, withAlbumShown)


type Msg
    = ScrollPhotosFinished
    | UserAskedToDeleteAPhoto FileName
    | UserAskedToRotateAPhoto Int FileName
    | UserClickedPhoto
    | PhotoWasDeleted (Result Http.Error String)
    | PhotoWasRotated (Result Http.Error String)
    | ScanPhotosResult (Maybe FileName) (Result Http.Error (List PhotoMetadata))
    | GetAlbumsResult (Maybe FileName) (Result Http.Error (List String))
    | UrlHasChanged Location
    | UserChangedAlbum AlbumName
    | UserClickedThumbnail PhotoMetadata


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ScrollPhotosFinished ->
            ( model, Cmd.none )

        UserClickedThumbnail photo ->
            let
                newModel =
                    model |> withPhotoShown (Just photo.relativeFilePath)
            in
                ( newModel, newUrl (newModel |> hash) )

        UserClickedPhoto ->
            let
                newModel =
                    model |> withPhotoShown Nothing
            in
                ( newModel, newUrl (newModel |> hash) )

        UserAskedToDeleteAPhoto fileName ->
            ( model, deletePhoto fileName )

        UserAskedToRotateAPhoto angle fileName ->
            ( model, rotatePhoto angle fileName )

        PhotoWasDeleted (Ok deletedFilePath) ->
            if deletedFilePath /= "" then
                let
                    newModel =
                        model |> removePhotoShown

                    newHash =
                        newModel |> hash
                in
                    ( newModel, modifyUrl newHash )
            else
                ( model, Cmd.none )

        PhotoWasDeleted (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        PhotoWasRotated (Ok newPath) ->
            ( model |> updateCurrentPhotoPath newPath, Cmd.none )

        PhotoWasRotated (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        ScanPhotosResult _ (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        ScanPhotosResult photoToShow (Ok photos) ->
            let
                newModel =
                    model
                        |> withPhotos photos
                        |> withPhotoShown photoToShow
                        |> withMessage ""
            in
                ( newModel
                , Task.attempt (\_ -> ScrollPhotosFinished) (Dom.Scroll.toTop "photos")
                )

        GetAlbumsResult _ (Err _) ->
            ( model |> withMessage "Error getting albums"
            , Cmd.none
            )

        GetAlbumsResult photoToShow (Ok albumList) ->
            ( model
                |> withAlbums albumList
                |> withMessage ""
            , case model |> albumShown of
                Nothing ->
                    Cmd.none

                Just name ->
                    getAlbumPhotos name photoToShow
            )

        UserChangedAlbum albumName ->
            ((model |> withAlbumShown (Just albumName))
                ! [ newUrl (model |> hash), getAlbumPhotos albumName Nothing ]
            )

        UrlHasChanged _ ->
            ( model, Cmd.none )



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
        request =
            Http.get
                ("api/rotate?angle=" ++ toString angle ++ "&photo=" ++ encodeUri fileName)
                Json.Decode.string
    in
        Http.send PhotoWasRotated request


getAlbumPhotos : String -> Maybe FileName -> Cmd Msg
getAlbumPhotos albumName photoToShow =
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
        Http.send (ScanPhotosResult photoToShow) request


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
