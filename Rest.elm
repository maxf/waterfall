module Rest exposing (..)
import Http exposing (..)
import Types exposing (..)


httpErrorToString : Error -> String
httpErrorToString e =
    case e of
        BadUrl msg ->
            "Bad URL: " ++ msg

        Timeout ->
            "Network timeout"

        NetworkError ->
            "Network error"

        BadStatus response ->
            "Bad status: " ++ (response.status.code |> toString)

        BadPayload msg response ->
            "Bad payload: " ++ msg


fetchPhotoMetadata : Cmd Msg
fetchPhotoMetadata =
    send PhotoMetadataLoaded (getString "metadata.csv")
