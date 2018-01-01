module Update exposing (update)

import Http
import Model exposing (Model)
import Auth exposing (authenticate, storeAuthToken)
import Types exposing (..)


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
                  , getTimeline model.instanceUrl response.token model.timelineType
                  ]

        AuthReturn (Err error) ->
            ( { model | message = Just ("auth error: " ++ httpErrorMessage error) }, Cmd.none )

        TimelineFetched (Ok timeline) ->
            ( { model | timeline = List.filter (\s -> s.mediaAttachments /= []) timeline }
            , Cmd.none
            )

        TimelineFetched (Err e) ->
            ( { model | message = Just ("timeline error: " ++ httpErrorMessage e) }, Cmd.none )

        CloseMessage ->
            ( { model | message = Nothing }, Cmd.none )

        AuthTokenRetrieved ( _, token ) ->
            case token of
                Nothing ->
                    ( model, Cmd.none )

                Just tokenValue ->
                    ( { model | authToken = token }
                    , getTimeline model.instanceUrl tokenValue model.timelineType
                    )

        UrlHasChanged location ->
            let
                timeline =
                    if location.hash == "#home" then Home
                    else if location.hash == "#public" then Public
                    else Home
            in
                ( { model | timelineType = Home }
                , getTimeline model.instanceUrl model.authToken model.timelineType
                )



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines


getTimeline : String -> String -> TimelineType -> Cmd Msg
getTimeline instanceUrl authToken timelineType =
    let
        urlPath =
            case timelineType of
                Home ->
                    "/api/v1/timelines/home"

                Public ->
                    "/api/v1/timelines/public"

                Hashtag tag ->
                    "/api/v1/timelines/tag/" ++ Http.encodeUri tag

                List id ->
                    "/api/v1/timelines/list/" ++ Http.encodeUri id

        request =
            Http.request
                { method = "GET"
                , headers = [ Http.header "Authorization" ("Bearer " ++ authToken) ]
                , url = instanceUrl ++ urlPath ++ "?limit=40"
                , body = Http.emptyBody
                , expect = Http.expectJson timelineDecoder
                , timeout = Nothing
                , withCredentials = False
                }
    in
        Http.send TimelineFetched request


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
            toString response.status.code
                ++ " ("
                ++ response.status.message
                ++ ") - "
                ++ response.body

        Http.BadPayload text _ ->
            "Bad payload: " ++ text
