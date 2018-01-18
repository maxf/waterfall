port module Ports exposing (..)

import Types exposing (..)


-- ports


port localStorageSetItem : ( String, String ) -> Cmd msg


port localStorageGetItem : String -> Cmd msg


port localStorageRemoveItem : String -> Cmd msg


port fileSelected : String -> Cmd msg


port fileContentRead : (ImagePortData -> msg) -> Sub msg



-- subscriptions


port localStorageRetrievedItem : (( String, Maybe String ) -> msg) -> Sub msg
