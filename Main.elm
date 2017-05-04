port module Main exposing (..)
import Types exposing (..)
import Html
import Dict
import View
import Time.DateTime exposing (..)
import Dom exposing (Error)
import Dom.Scroll
import Task


main : Program Never Model Msg
main =
    Html.program
        { view = View.view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }


init : ( Model, Cmd Msg )
init =
    (Model
        ""
         Nothing
         0
         Dict.empty
         (dateTime { zero | year = 2016, month = 1, day = 1})
    , Cmd.none
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | dateShown =
                    addYear 1 model.photoMetadata model.dateShown }
            , Cmd.none
            )

        Decrement ->
            ( { model | dateShown =
                    addYear -1 model.photoMetadata model.dateShown }
            , Cmd.none
            )

        ShowPhotosForDate date ->
            ( { model | dateShown = date }
            , (Task.attempt scrollResult (Dom.Scroll.toTop "photos"))
            )

        ScrollPhotosFinished ->
            ( model, Cmd.none )

        DeletePhoto metadata ->
            ( model, deletePhoto metadata.fileName )

        DeletePhotoResult deletedPhotoFileName ->
            if deletedPhotoFileName /= "" then
                ( model |> removePhotoFromModel deletedPhotoFileName, Cmd.none )
            else
                ( model, Cmd.none )

        ScanPhotosResult fileList ->
            let
                metadata : MetadataDict
                metadata =
                    Types.buildMeta fileList

                dateShown =
                    dateOfFirstPhotoOfYear (year model.dateShown) metadata

            in
                (
                   { model
                   | photoMetadata = metadata
                   , maxPicturesInADay = maxNbPictures metadata
                   , dateShown = dateShown
                   }
                , Cmd.none
                )

        RequestPhotoDir ->
            ( model, requestPhotoDir "" )

        RequestPhotoDirResult paths ->
            case paths of
                [ path ] ->
                    ({ model | photoDir = path }, scanPhotos path)

                _ ->
                    ( model, Cmd.none )


-- ports

port deletePhoto : String -> Cmd msg
port scanPhotos : String -> Cmd msg
port requestPhotoDir : String -> Cmd msg

-- subscriptions

port deletePhotoResult : (String -> msg) -> Sub msg
port scanPhotosResult : (List String -> msg) -> Sub msg
port requestPhotoDirResult : (List String -> msg) -> Sub msg



subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ requestPhotoDirResult RequestPhotoDirResult
        , deletePhotoResult DeletePhotoResult
        , scanPhotosResult ScanPhotosResult
        ]


-- Misc

scrollResult : Result Dom.Error () -> Msg
scrollResult result =
    ScrollPhotosFinished
