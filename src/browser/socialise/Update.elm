module Update exposing (Msg(..), update)

import Http exposing (encodeUri, decodeUri)
import Json.Decode
import Json.Decode.Pipeline
import Model exposing (Model, Status)


type Msg
    = Username String
    | Password String
    | InstanceUrl String
    | AuthSubmit
    | AuthReturn (Result Http.Error AuthResponse)
    | TimelineFetched (Result Http.Error (List Status))
    | CloseMessage


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
            ( { model | authToken = Just response.token, message = Nothing }
            , getTimeline model.instanceUrl response.token
            )

        AuthReturn (Err _) ->
            ( { model | message = Just "auth error" }, Cmd.none )

        TimelineFetched (Ok timeline) ->
            ( { model | timeline = timeline }, Cmd.none )

        TimelineFetched (Err _) ->
            ( { model | message = Just "timeline error" }, Cmd.none )

        CloseMessage ->
            ( { model | message = Nothing }, Cmd.none )


authenticate : Model -> Cmd Msg
authenticate model =
    let
        postParams : String
        postParams =
            "client_id=<client_id>&client_secret=<client_secret>&grant_type=password&username=" ++ encodeUri model.username ++ "&password=" ++ encodeUri model.password

        request =
            Http.post
                (model.instanceUrl ++ "/oauth/token")
                (Http.stringBody "application/x-www-form-urlencoded" postParams)
                oauthResponseDecoder
    in
        Http.send AuthReturn request


type alias AuthResponse =
    { token : String }


oauthResponseDecoder : Json.Decode.Decoder AuthResponse
oauthResponseDecoder =
    Json.Decode.succeed AuthResponse
        |> Json.Decode.Pipeline.required "access_token" Json.Decode.string



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


statusDecoder : Json.Decode.Decoder Status
statusDecoder =
    Json.Decode.succeed Status
        |> Json.Decode.Pipeline.required "id" Json.Decode.string
        |> Json.Decode.Pipeline.required "url" Json.Decode.string
        |> Json.Decode.Pipeline.required "content" Json.Decode.string
