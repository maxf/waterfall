module Main exposing (main)

import Auth exposing (authenticate, checkAuthToken, storeAuthToken)
import Browser
import Browser.Navigation as Nav
import Model exposing (Model, initialModel)
import Ports
    exposing
        ( formImageRetrieved
        , localStorageRetrievedItem
        , statusPosted
        )
import String exposing (contains, startsWith)
import Types exposing (..)
import Update exposing (fetchCurrentUserDetails, fetchOtherUserDetails, getStatus, getTimeline, update)
import Url
import Url.Parser exposing ((</>), (<?>), Parser, fragment, map, oneOf, parse, query, s, string, top)
import Url.Parser.Query as Query
import View exposing (view)


main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        , onUrlChange = UrlHasChanged
        , onUrlRequest = LinkWasClicked
        }



--type alias UrlData = { params : QueryStringParams, fragment : Maybe String }


type alias Fragment =
    Maybe String


type alias QueryStringParams =
    { code : Maybe String
    , state : Maybe String
    }


type alias UrlData =
    { queryStringParams : QueryStringParams, fragment : Fragment }


queryStringParser : Query.Parser QueryStringParams
queryStringParser =
    Query.map2 QueryStringParams (Query.string "code") (Query.string "state")


codeIdentityParser : Parser (QueryStringParams -> Fragment -> a) a
codeIdentityParser =
    top </> query queryStringParser </> fragment identity
--    query queryStringParser </> fragment identity
--    s "waterfall" <?> queryStringParser </> fragment identity


urlParser : Parser (UrlData -> a) a
urlParser =
    map UrlData codeIdentityParser


queryStringAndFragment : Url.Url -> Maybe UrlData
queryStringAndFragment url =
    parse urlParser { url | path = "" }


init : () -> Url.Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url key =
    let
        startModel =
            initialModel key url
    in
    case queryStringAndFragment url of
        Nothing ->
            -- just the hostname+path, proceed to home page
            ( startModel, checkAuthToken )

        Just { queryStringParams, fragment } ->
            case queryStringParams.code of
                Just code ->
                    -- this is an auth redirect page
                    let
                        newModel =
                            { startModel | authCode = Just code }

                    in
                    ( newModel, authenticate newModel )

                Nothing ->
                    -- any other page
                    case fragment of
                        Nothing ->
                            ( startModel, checkAuthToken )

                        Just frag ->
                            if frag |> startsWith "user:" then
                                let
                                    acct =
                                        String.dropLeft 5 frag

                                    model =
                                        initialModel key url

                                in
                                    ( { model | view = UserPage acct }
                                    , Cmd.batch [ checkAuthToken, fetchOtherUserDetails model.server.url acct]
                                    )
                            else
                                ( startModel, checkAuthToken )


{-

       case parse urlParser url of
           Nothing ->
               ( initialModel key url PublicTimeline, checkAuthToken )

           Just { queryStringParams, fragment } ->
               case queryStringParams.code of
                   Just code ->
                       let
                           model =
                               initialModel key url HomePage
                           newModel =
                               { model | authCode = Just code }
                       in
                       ( newModel, authenticate newModel )

                   Nothing ->
                       case fragment of
                           Nothing ->
                               ( initialModel key url PublicTimeline, checkAuthToken )

                           Just "home" ->
                               ( initialModel key url HomePage, checkAuthToken )

                           Just "me" ->
                               ( initialModel key url ProfilePage, checkAuthToken )

                           Just frag ->
                               if frag |> startsWith "user:" then
                                   let
                                       userId =
                                           String.dropLeft 5 frag

                                       model =
                                           initialModel key url (UserPage userId)
                                   in
                                   ( model
                                   , getTimeline model.server.url model.authToken (UserPage userId)
                                   )

                               else if frag |> startsWith "photo:" then
                                   case photoHashParts frag of
                                       Ok ( statusId, attachmentId ) ->
                                           let
                                               model =
                                                   initialModel key url (PhotoPage statusId attachmentId)
                                           in
                                           ( model
                                           , getStatus model.server.url model.authToken statusId
                                           )

                                       Err _ ->
                                           ( initialModel key url PublicTimeline
                                           , Cmd.none
                                           )

                               else if frag |> startsWith "share:" then
                                   ( initialModel key url (SharePathPage (String.dropLeft 6 frag))
                                   , checkAuthToken
                                   )

                               else if frag |> startsWith "upload:" then
                                   ( initialModel key url (ShareUploadPage Nothing)
                                   , checkAuthToken
                                   )

                               else
                                   ( initialModel key url PublicTimeline
                                   , checkAuthToken
                                   )
   -
-}


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ localStorageRetrievedItem (Auth << AuthTokenRetrievedFromLocalStorage)
        , formImageRetrieved (Share << FormImageRead)
        , statusPosted (Share << StatusPosted)
        ]
