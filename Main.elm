module Main exposing (..)
import Rest exposing (..)
import Types exposing (..)
import Html
import Dict
import View
import Time.Date as Date exposing (..)
import Dom exposing (Error)
import Dom.Scroll
import Task


main : Program Never Model Msg
main =
    Html.program
        { view = View.view
        , update = update
        , init = init
        , subscriptions = \_ -> Sub.none
        }


init : ( Model, Cmd Msg )
init =
    Model Nothing 0 Dict.empty (Date.date 2017 1 1)
        ! [ fetchPhotoMetadata ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        -- TODO: don't fetch metadata every time
        Increment ->
            ( { model | dateShown = addYear 1 model.photoMetadata model.dateShown }
            , fetchPhotoMetadata
            )

        Decrement ->
            ( { model | dateShown = addYear -1 model.photoMetadata model.dateShown }
            , fetchPhotoMetadata
            )

        PhotoMetadataLoaded (Ok csv) ->
            let
                metadata : MetadataDict
                metadata =
                    Types.buildMeta (year model.dateShown) csv

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

        PhotoMetadataLoaded (Err error) ->
            ( { model | error = Just (error |> httpErrorToString) }
            , Cmd.none
            )

        ShowPhotosForDate date ->
            ( { model | dateShown = date }
            , (Task.attempt scrollResult (Dom.Scroll.toTop "photos"))
            )

        ScrollPhotosFinished ->
            ( model, Cmd.none )


scrollResult : Result Dom.Error () -> Msg
scrollResult result =
    ScrollPhotosFinished
