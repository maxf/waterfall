module Main exposing (main)

import Http
import Json.Decode
import Navigation
import View
import Model exposing (Model)
import Update exposing (Msg(GetAlbumsResult, UrlChange), update, fromHash)
import Types exposing (FileName)


main : Program Never Model Msg
main =
    Navigation.program UrlChange
        { view = View.view
        , update = update
        , init = init
        , subscriptions = \_ -> Sub.none
        }


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    let
        hashParams =
            fromHash location
    in
        ( Model.initialModel
            |> Model.withPhotoShown hashParams.preview
            |> Model.withAlbumShown hashParams.album
        , getAlbumList hashParams.preview
        )


getAlbumList : Maybe FileName -> Cmd Msg
getAlbumList photoToShow =
    let
        apiUrl =
            "api/dirs"

        request =
            Http.get apiUrl (Json.Decode.list Json.Decode.string)
    in
        Http.send (GetAlbumsResult photoToShow) request
