module Update exposing (update)

import Http
import Maybe exposing (withDefault)
import Navigation exposing (Location)
import Model exposing (Model)
import Auth exposing (authenticate, storeAuthToken, clearAuthToken)
import Types exposing (..)
import Regex

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
                ! [ storeAuthToken response.token, getUser response.token model.instanceUrl ]

        AuthReturn (Err error) ->
            ( { model | message = Just ("auth error: " ++ httpErrorMessage error) }, Cmd.none )

        TimelineFetched (Ok timeline) ->
            ( { model | timeline = List.filter (\s -> s.mediaAttachments /= []) timeline }
            , Cmd.none
            )

        TimelineFetched (Err e) ->
            ( { model | message = Just ("timeline error: " ++ httpErrorMessage e) }, Cmd.none )

        UserFetched (Err e) ->
            ( { model | message = Just ("account fetch error: " ++ httpErrorMessage e) }
            , Cmd.none
            )

        UserFetched (Ok account) ->
            ( { model | username = account.acct, userId = Just account.id }
            , getTimeline model.instanceUrl model.authToken model.timelineType
            )

        CloseMessage ->
            ( { model | message = Nothing }, Cmd.none )

        AuthTokenRetrieved ( _, token ) ->
            case token of
                Nothing ->
                    ( model, Cmd.none )

                Just tokenValue ->
                    ( { model | authToken = token, password = "" }
                    ,   getUser tokenValue model.instanceUrl
                    )

        UrlHasChanged location ->
            let
                timeline =
                    if location.hash == "#home" then
                        Home
                    else if location.hash == "#public" then
                        Public
                    else if location.hash == "#me" then
                        User model.instanceUrl (model.userId |> withDefault "")
                    else
                        Home
            in
                ( { model | timelineType = timeline }
                , case model.authToken of
                    Just token ->
                        getTimeline model.instanceUrl model.authToken timeline

                    Nothing ->
                        Cmd.none
                )

        Logout ->
            ( { model | authToken = Nothing }, clearAuthToken )



-- https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#timelines


getTimeline : String -> Maybe String -> TimelineType -> Cmd Msg
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

                User server id ->
                    server ++ "/api/v1/accounts/" ++ Http.encodeUri id ++ "/statuses"

        headers =
            case authToken of
                Nothing ->
                    []

                Just token ->
                    [ Http.header "Authorization" ("Bearer " ++ token) ]

        request =
            Http.request
                { method = "GET"
                , headers = headers
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


getUser : String -> String -> Cmd Msg
getUser authToken instanceUrl =
    Http.send
        UserFetched
        (Http.request
            { method = "GET"
            , headers = [ Http.header "Authorization" ("Bearer " ++ authToken) ]
            , url = instanceUrl ++ "/api/v1/accounts/verify_credentials"
            , body = Http.emptyBody
            , expect = Http.expectJson accountDecoder
            , timeout = Nothing
            , withCredentials = False
            }
        )


timeLineType : Location -> Model -> TimelineType
timeLineType url model =
    if url.hash == "#public" then
        Public
    else if url.hash == "#me" then
        User model.instanceUrl (model.userId |> withDefault "")
    else if String.startsWith "#user:" url.hash then
        parseUserHash url.hash
    else
        Home

parseUserHash : String -> TimelineType
parseUserHash hash =
    let
        hashRe = Regex.regex "^#user:([^@]+)@([^:]+):(\\d+)$"
        matches = Regex.find Regex.All hashRe hash
    in
        case matches of
            [ match ] ->
                case match.submatches of
                    [ Just matchUsername, Just matchServer, Just matchId ] ->
                        User matchServer matchId
                    _ ->
                        Home
            _ ->
                Home
