port module Ports
    exposing
        ( deletePhoto
        , scanPhotos
        , saveModel
        , requestPhotoDir
        , requestPhotoDirResult
        , deletePhotoResult
        , scanPhotosResult
        , saveModelResult
        , loadModel
        , loadModelResult
        , applicationQuitting
        )

import Types exposing (PhotoMetadata)


port deletePhoto : ( String, String ) -> Cmd msg


port scanPhotos : String -> Cmd msg


port requestPhotoDir : String -> Cmd msg


port saveModel : String -> Cmd msg


port loadModel : String -> Cmd msg



-- subscriptions


port deletePhotoResult : (( String, String ) -> msg) -> Sub msg


port scanPhotosResult : (List PhotoMetadata -> msg) -> Sub msg


port requestPhotoDirResult : (List String -> msg) -> Sub msg


port loadModelResult : (String -> msg) -> Sub msg


port saveModelResult : (Bool -> msg) -> Sub msg


port applicationQuitting : (String -> msg) -> Sub msg
