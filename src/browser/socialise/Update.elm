module Update exposing (update)

import Http
import Json.Decode
import Json.Decode.Pipeline
import Model exposing (Model)
import Auth exposing (authenticate, storeAuthToken)
import Types exposing (Msg(..), Status, Attachment, AttachmentType(..))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Username username ->
            ( { model | username = username }, Cmd.none )

        Password password ->
            ( { model | password = password }, Cmd.none )

        InstanceUrl url ->
            ( { model | instanceUrl = url }, Cmd.none )

        AuthSubmit ->
            ( model, authenticate model )

        AuthReturn (Ok response) ->
            { model | authToken = Just response.token, message = Nothing }
                ! [ storeAuthToken response.token
                  , getTimeline model.instanceUrl response.token
                  ]

        AuthReturn (Err error) ->
            ( { model | message = Just ("auth error: " ++ httpErrorMessage error) }, Cmd.none )

        TimelineFetched (Ok timeline) ->
            ( { model | timeline = timeline }, Cmd.none )

        TimelineFetched (Err _) ->
            ( { model | message = Just "timeline error" }, Cmd.none )

        CloseMessage ->
            ( { model | message = Nothing }, Cmd.none )

        AuthTokenRetrieved ( _, token ) ->
            case token of
                Nothing ->
                    ( model, Cmd.none )
                Just tokenValue ->
                    ( { model | authToken = token }
                    , getTimeline model.instanceUrl tokenValue
                    )



-- | authToken = token },  )
-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines


getTimeline : String -> String -> Cmd Msg
getTimeline instanceUrl authToken =
    let
        request =
            Http.request
                { method = "GET"
                , headers = [ Http.header "Authorization" ("Bearer " ++ authToken) ]
                , url = instanceUrl ++ "/api/v1/timelines/home"
                , body = Http.emptyBody
                , expect = Http.expectJson timelineDecoder
                , timeout = Nothing
                , withCredentials = False
                }
    in
        Http.send TimelineFetched request


timelineDecoder : Json.Decode.Decoder (List Status)
timelineDecoder =
    Json.Decode.list statusDecoder


attachmentTypeDecoder : String -> Json.Decode.Decoder AttachmentType
attachmentTypeDecoder s =
    case s of
        "image" ->
            Json.Decode.succeed Image

        "video" ->
            Json.Decode.succeed Video

        "gifv" ->
            Json.Decode.succeed Gifv

        _ ->
            Json.Decode.succeed Unknown


mediaAttachmentDecoder : Json.Decode.Decoder Attachment
mediaAttachmentDecoder =
    Json.Decode.succeed Attachment
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "type"
            (Json.Decode.string |> Json.Decode.andThen attachmentTypeDecoder)
        |> Json.Decode.Pipeline.required "url" Json.Decode.string


statusDecoder : Json.Decode.Decoder Status
statusDecoder =
    Json.Decode.succeed Status
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "url" Json.Decode.string
        |> Json.Decode.Pipeline.required "content" Json.Decode.string
        |> Json.Decode.Pipeline.required "media_attachments"
            (Json.Decode.list mediaAttachmentDecoder)


httpErrorMessage : Http.Error -> String
httpErrorMessage error =
    case error of
        Http.BadUrl string ->
            "Bad URL: " ++ string

        Http.Timeout ->
            "Timeout"

        Http.NetworkError ->
            "Network error"

        Http.BadStatus response ->
            (toString response.status.code)
                ++ " ("
                ++ response.status.message
                ++ ") - "
                ++ response.body

        Http.BadPayload text _ ->
            "Bad payload: " ++ text
