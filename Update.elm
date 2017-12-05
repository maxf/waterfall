module Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto, UserClickedOnPhoto, PhotoWasDeleted, ScanPhotosResult, GetAlbumsResult, UrlChange), update, fromHash)

import Dom.Scroll
import Task
import Http exposing (Error(BadUrl, Timeout, NetworkError, BadStatus, BadPayload), encodeUri, decodeUri)
import Json.Decode
import Navigation exposing (Location, modifyUrl)
import Regex exposing (regex, HowMany(AtMost), find)
import Types exposing (PhotoMetadata, FileName, RenamedPath, AlbumHash(NoAlbum, AllAlbums, Album), HashFields)
import Model exposing (Model, withPhotoShown, withMessage, withPhotos, removePhotoShown, updateCurrentPhotoPath, withAlbums, modelHash, albumShown, withAlbumShown)


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
            ( model |> withPhotoShown Nothing, Cmd.none )

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
                        newModel |> modelHash
                in
                    ( newModel, modifyUrl newHash )
            else
                ( model, Cmd.none )

        PhotoWasDeleted (Err httpError) ->
            ( model |> withMessage (httpError |> errorMessage), Cmd.none )

        PhotoWasRotated (Ok renamedPath) ->
            ( model |> updateCurrentPhotoPath renamedPath, Cmd.none )

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

                ( cmd, message ) =
                    if hashParams.album /= albumShown model then
                        case hashParams.album of
                            NoAlbum ->
                                ( Cmd.none, "" )

                            AllAlbums ->
                                ( getAlbumPhotos "", "Loading all photos" )

                            Album name ->
                                ( getAlbumPhotos name, "Loading " ++ name )
                    else
                        ( Cmd.none, "" )

                newModel =
                    model
                        |> withPhotoShown hashParams.preview
                        |> withAlbumShown hashParams.album
                        |> withMessage message
            in
                ( newModel, cmd )



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


hashRegex : Regex.Regex
hashRegex =
    regex "^#([^:]*):(.*)$"


fromHash : Location -> HashFields
fromHash location =
    let
        matches =
            find (AtMost 1) hashRegex (decodeUri location.hash |> Maybe.withDefault "")
    in
        case List.map .submatches matches of
            [ [ album, photo ] ] ->
                HashFields
                    (case album of
                        Nothing ->
                            NoAlbum

                        Just name ->
                            if name == "" then
                                AllAlbums
                            else
                                Album name
                    )
                    (case photo of
                        Nothing ->
                            Nothing

                        Just path ->
                            if path == "" then
                                Nothing
                            else
                                Just path
                    )

            _ ->
                HashFields NoAlbum Nothing
