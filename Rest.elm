module Rest exposing (..)
import Http exposing (..)
import Json.Decode as Decode
import Types exposing (..)

type alias Url = String

fetchPhotoMetadata: Cmd Msg
fetchPhotoMetadata =
    let
        url = "metadata.csv"
    in
        Http.send PhotoMetadataLoaded (Http.get url Decode.string)
