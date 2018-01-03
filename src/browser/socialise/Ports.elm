port module Ports exposing (..)

-- ports


port localStorageSetItem : ( String, String ) -> Cmd msg


port localStorageGetItem : String -> Cmd msg


port localStorageRemoveItem : String -> Cmd msg



-- subscriptions


port localStorageRetrievedItem : (( String, Maybe String ) -> msg) -> Sub msg
