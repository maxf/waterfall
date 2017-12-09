module Types exposing (Photo, TimestampSeconds, PhotoPath, JsonString, AlbumDir)


type alias PhotoPath =
    String


type alias AlbumDir =
    String


type alias TimestampSeconds =
    Int


type alias JsonString =
    String


type alias Photo =
    { relativeFilePath : PhotoPath
    , dateCreated : Maybe TimestampSeconds
    }
