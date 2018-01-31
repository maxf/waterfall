module Main exposing (main)

import Navigation exposing (Location)
import View exposing (view)
import Model exposing (Model, initialModel)
import Update exposing (update)
import Ports exposing (localStorageRetrievedItem, formImageRetrieved, statusPosted)
import Types exposing (..)
import Auth exposing (checkAuthToken)
import Regex exposing (find, regex, HowMany(..))

main : Program Never Model Msg
main =
    Navigation.program UrlHasChanged
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }


init : Location -> ( Model, Cmd msg )
init url =
    let
        whatToShow =
            if url.hash == "#public" then
                PublicTimeline
            else if String.startsWith "#user:" url.hash then
                UserTimeline (String.dropLeft 6 url.hash)
            else if String.startsWith "#share:" url.hash then
                SharePath (String.dropLeft 7 url.hash)
            else if String.startsWith "#upload" url.hash then
                UploadFile Nothing
            else if String.startsWith "#photo:" url.hash then
                case getPhotoDetailsFromHash url.hash Nothing of
                    ( Just status, Just attachment ) ->
                        Photo status attachment
                    _ ->
                        HomeTimeline  -- should instead redirect to #home
            else
                HomeTimeline
    in
        ( { initialModel | screenShown = whatToShow }, checkAuthToken )


getStatusAttachment : String -> String -> ( Maybe Status, Maybe Attachment )
getStatusAttachment statusId attachmentId =
-- we need to look up statusId and attachmentId on the server

getPhotoDetailsFromHash : String -> ( Maybe Status, Maybe Attachment )
getPhotoDetailsFromHash hash =
    let
        matches =
            find (AtMost 1) (regex "#photo:([^:]+):([^:]+)") hash
    in
        case matches of
            [ match ] ->
                case match.submatches of
                    [ Just statusId, Just attachmentId ] ->
                        getStatusAttachment statusId, attachmentId
                    _ ->
                        ( Nothing, Nothing )
            _ ->
                ( Nothing, Nothing )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ localStorageRetrievedItem AuthTokenRetrieved
        , formImageRetrieved FormImageRead
        , statusPosted StatusPosted
        ]
