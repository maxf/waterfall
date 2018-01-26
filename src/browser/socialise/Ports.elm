port module Ports exposing (..)

import Types exposing (..)


-- ports


port localStorageSetItem : ( String, String ) -> Cmd msg


port localStorageGetItem : String -> Cmd msg


port localStorageRemoveItem : String -> Cmd msg


port getImageFromForm : String -> Cmd msg


port fileUpload : ( String, String, String, String ) -> Cmd msg



-- subscriptions


port localStorageRetrievedItem : (( String, Maybe String ) -> msg) -> Sub msg


port formImageRetrieved : (ImagePortData -> msg) -> Sub msg


port statusPosted : (Maybe String -> msg) -> Sub msg
