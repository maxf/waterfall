module Types exposing (Photo, PhotoPath, AlbumDir)


type alias PhotoPath =
    String


type alias AlbumDir =
    String


type alias TimestampSeconds =
    Int


type alias Photo =
    { relativeFilePath : PhotoPath
    , dateCreated : Maybe TimestampSeconds
    }
