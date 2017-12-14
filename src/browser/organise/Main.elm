module Main exposing (main)

import Http exposing (decodeUri)
import Json.Decode
import Navigation exposing (Location)
import Regex exposing (regex, HowMany(AtMost), find)
import View
import Model exposing (Model)
import Update exposing (Msg(UrlHasChanged, GetAlbumsResult), update)
import Types exposing (PhotoPath, AlbumDir)


main : Program Never Model Msg
main =
    Navigation.program UrlHasChanged
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
            |> Model.withPhotoShown (Tuple.second hashParams)
            |> Model.withAlbumShown (Tuple.first hashParams)
        , getAlbumList (Tuple.second hashParams)
        )


hashRegex : Regex.Regex
hashRegex =
    regex "^#([^:]*):?(.*)$"


fromHash : Location -> ( Maybe AlbumDir, Maybe PhotoPath )
fromHash location =
    let
        matches =
            find (AtMost 1) hashRegex (decodeUri location.hash |> Maybe.withDefault "")
    in
        case List.map .submatches matches of
            [ [ album, photo ] ] ->
                ( album, photo )

            _ ->
                ( Nothing, Nothing )


getAlbumList : Maybe PhotoPath -> Cmd Msg
getAlbumList photoToShow =
    let
        apiUrl =
            "api/dirs"

        request =
            Http.get apiUrl (Json.Decode.list Json.Decode.string)
    in
        Http.send (GetAlbumsResult photoToShow) request
