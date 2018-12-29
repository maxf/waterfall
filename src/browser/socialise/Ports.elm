port module Ports exposing (..)

import Types exposing (..)


-- ports


port localStorageSetItem : ( String, String ) -> Cmd msg


port localStorageGetItem : String -> Cmd msg


port localStorageRemoveItem : String -> Cmd msg


port getImageFromForm : String -> Cmd msg

type alias UploadParams =
    { inputElementId : String
    , serverUrl : String
    , authToken : String
    , text : String
    }

port fileUpload : UploadParams -> Cmd msg



-- subscriptions


port localStorageRetrievedItem : (( String, Maybe String ) -> msg) -> Sub msg


port formImageRetrieved : (ImagePortData -> msg) -> Sub msg


port statusPosted : (Maybe String -> msg) -> Sub msg
