module Main exposing (..)

import Rest exposing (..)
import Types exposing (..)
import Html
import Dict
import View


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
    Model 2016 "" 0 Dict.empty
        ! [ fetchPhotoMetadata ]


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Increment ->
            ( { model | year = model.year - 1 }, fetchPhotoMetadata )

        Decrement ->
            ( { model | year = model.year - 1 }, fetchPhotoMetadata )

        PhotoMetadataLoaded (Ok csv) ->
            let
                metadata =
                    Types.buildMeta model.year csv
            in
                ( { model
                    | photoMetadata = metadata
                    , maxPicturesInADay = maxNbPictures metadata
                  }
                , Cmd.none
                )

        PhotoMetadataLoaded (Err error) ->
            ( { model | error = error |> httpErrorToString }
            , Cmd.none
            )
