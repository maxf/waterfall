port module Ports exposing (localStorageSetItem, localStorageGetItem, localStorageRetrievedItem)

-- ports


port localStorageSetItem : ( String, String ) -> Cmd msg


port localStorageGetItem : String -> Cmd msg



-- subscriptions


port localStorageRetrievedItem : (( String, Maybe String ) -> msg) -> Sub msg
