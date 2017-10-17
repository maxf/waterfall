port module Ports
    exposing
        ( deletePhoto
        , deletePhotoResult
        )


port deletePhoto : ( String, String ) -> Cmd msg



-- subscriptions


port deletePhotoResult : (String -> msg) -> Sub msg
