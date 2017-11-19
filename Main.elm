module Main exposing (main)

import Http
import Json.Decode
import Navigation
import View
import Model exposing (Model)
import Update exposing (Msg(GetAlbumsResult, UrlChange), update, fromHash)


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

        photo =
            if hashParams.photoPath == "" then
                Nothing
            else
                Just hashParams.photoPath
    in
        ( Model.initialModel
            |> Model.withDateShown hashParams.date
            |> Model.withPhotoShown photo
            |> Model.withAlbumShown (Just hashParams.albumName)
        , getAlbumList
        )


getAlbumList : Cmd Msg
getAlbumList =
    let
        apiUrl =
            "api/dirs"

        request =
            Http.get apiUrl (Json.Decode.list Json.Decode.string)
    in
        Http.send GetAlbumsResult request
