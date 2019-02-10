module View exposing (view)

import Auth exposing (loginUrl)
import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (on, onClick, onInput)
import Html.Extra exposing (viewIfLazy)
import Json.Decode exposing (succeed)
import Maybe exposing (withDefault)
import Model exposing (Model, baseUrl)
import Regex
import Types exposing (..)


view : Model -> Browser.Document Msg
view model =
    let
        message =
            case model.message of
                Nothing ->
                    div [] []

                Just messageText ->
                    div
                        [ class "error", onClick CloseMessage ]
                        [ messageText |> text ]
    in
    { title = "Waterfall"
    , body =
        [ if model.view /= StartingPage then
            div
                [ class "outer" ]
                [ div
                    [ class "columns" ]
                    [ viewSidebar model
                    , div [ id "photos" ] [ viewMain model ]
                    ]
                , message
                ]

          else
            div [] []
        ]
    }


viewSidebar : Model -> Html Msg
viewSidebar model =
    div
        [ class "sidebar" ]
        [ div
            [ class "logo" ]
            [ a [ href (baseUrl model) ] [ text "Waterfall" ]
            , br [] []
            , span [ class "server" ] [ text model.server.url.host ]
            ]
        , viewSidebarLinks model
        ]


viewSidebarLinks : Model -> Html Msg
viewSidebarLinks model =
    case model.username of
        Nothing ->
            div [ class "button", onClick UserClickedLogin ] [ text "Log in" ]

        Just name ->
            div []
                [ div []
                    [ img [ class "avatar", src (model.userAvatar |> Maybe.withDefault "") ] []
                    , span [ class "username" ] [ text name ]
                    , a
                        [ href "#logout", class "logout" ]
                        [ text "Log out" ]
                    ]
                , ul []
                    [ li [] [ a [ href (baseUrl model) ] [ text "Home" ] ]
                    , li [] [ a [ href "#public" ] [ text "Public photos" ] ]
                    , li [] [ a [ href ("#user:" ++ name) ] [ text "My photos" ] ]
                    , li [] [ a [ href "#upload" ] [ text "Upload" ] ]
                    ]
                ]


viewMain : Model -> Html Msg
viewMain model =
    case model.view of
        LoginPage ->
            div []
                [ h1 [] [ text "Welcome to Waterfall" ]
                , p []
                    [ text "See some sample user pages: "
                    , a [ class "user", href "#user:maxf" ] [ text "@maxf" ]
                    , text " "
                    , a [ class "user", href "#user:Edent" ] [ text "@Edent" ]
                    , text " "
                    ]
                ]

        StatusPage _ ->
            case model.currentStatus of
                Nothing ->
                    nothing

                Just status ->
                    viewStatus status

        SharePathPage path ->
            case model.authToken of
                Nothing ->
                    div [] []

                _ ->
                    viewSharePath path

        ShareUploadPage Nothing ->
            case model.authToken of
                Nothing ->
                    div [] []

                _ ->
                    viewShareUpload

        ShareUploadPage (Just dataUrl) ->
            case model.authToken of
                Nothing ->
                    div [] []

                _ ->
                    viewShareUploaded dataUrl

        HomePage ->
            let
                title =
                    (model.username |> withDefault "") ++ "'s home"
            in
            div []
                [ h1 [] [ text title ]
                , viewTimeline model.timeline model.view
                ]

        PublicTimeline ->
            div []
                [ h1 [] [ text "Public timeline" ]
                , viewTimeline model.timeline model.view
                ]

        ErrorPage message ->
            div []
                [ h1 [] [ text "Error" ]
                , p [] [ text message ]
                ]

        LogoutPage ->
            div []
                [ h1 [] [ text "You have logged out" ] ]

        UserPage userId ->
            div []
                [ h1 [] [ ("@" ++ (model.otherUsername |> withDefault "")) ++ "'s pictures" |> text ]
                , viewTimeline model.timeline model.view
                ]

        ProfilePage ->
            div []
                [ h1 [] [ text "Your pictures" ]
                , viewTimeline model.timeline model.view
                ]

        StartingPage ->
            div [] []


thumbMarkup : Attachment -> Html Msg
thumbMarkup image =
    case image.type_  of
        Unknown ->
            span [] [ text "Unknown content type" ]

        _ ->
            img [ class "photo", src image.previewUrl ] []

attachmentMarkup : Attachment -> Html Msg
attachmentMarkup image =
    case image.type_  of
        Image ->
            img [ class "photo", src image.url ] []

        Video ->
            video [ class "photo" ] [ source [ src image.url ] [] ]

        Gifv ->
            video [ class "photo" ] [ source [ src image.url ] [] ]

        _ ->
            span [] [ text "Can't show this content" ]


viewStatusContent : Status -> Html Msg
viewStatusContent status =
    let
        content =
            case status.content of
                Nothing ->
                    nothing
                Just message ->
                    li [] [ message |> stripTags |> text ]

        favourites =
            if status.favouritesCount /= 0 then
                li [] [ "❤️" ++ (String.fromInt status.favouritesCount) |> text ]
            else
                nothing

        reblogs =
            if status.reblogsCount /= 0 then
                li [] [ "🔁" ++ (String.fromInt status.reblogsCount) |> text ]
            else
                nothing

        user =
            li []
                [ a [ class "user", href ("#user:" ++ status.account.acct) ]
                      [ text ("@" ++ status.account.acct) ]
                ]

    in
    ul [ class "content" ] [ user, favourites, reblogs, br [] [], content ]


viewStatus : Status -> Html Msg
viewStatus status =
    div [ class "status" ]
        (if status.sensitive then
            [ text "Sensitive content" ]
         else
             ((viewStatusContent status)
             ::
             List.map attachmentMarkup status.attachments)
        )


viewTimeline : List Status -> Screen -> Html Msg
viewTimeline timeline pageType =
    let
        statusesWithAttachments =
            List.filter
                (\s -> s.attachments /= [] && not s.sensitive)
                timeline
    in
    div [ class "timeline" ]
        (List.map (viewThumbnail pageType) statusesWithAttachments)


viewThumbnailContent : Maybe String -> Html Msg
viewThumbnailContent content =
    case content of
        Nothing ->
            div [] []

        Just html ->
            main_
                [ class "content" ]
                [ html |> stripTags |> text ]


viewThumbnailCaption : Screen -> Status -> Html Msg
viewThumbnailCaption pageType status =
    let
        attachmentCount =
            viewIfLazy
                (List.length status.attachments > 1)
                (\() ->
                    li [ title (String.fromInt (List.length status.attachments) ++ " photos") ]
                        [ text "🗇" ]
                )

        userName =
            viewIfLazy
                (pageType == HomePage || pageType == PublicTimeline)
                (\() ->
                    li []
                        [ a [ class "user", href ("#user:" ++ status.account.acct) ]
                            [ text ("@" ++ status.account.acct) ]
                        ]
                )

        favourites =
            if status.favouritesCount /= 0 then
                li [] [ "❤️" ++ (String.fromInt status.favouritesCount) |> text ]
            else
                nothing

        reblogs =
            if status.reblogsCount /= 0 then
                li [] [ "🔁" ++ (String.fromInt status.reblogsCount) |> text ]
            else
                nothing

    in
    ul [ class "statusThumbInfo" ]
        [ userName
        , attachmentCount
        , favourites
        , reblogs
        ]


viewThumbnail : Screen -> Status -> Html Msg
viewThumbnail pageType status =
    div [ class "statusThumb" ]
        [ div [] [ viewAttachments status ]
        , viewThumbnailCaption pageType status
        ]


viewAttachments : Status -> Html Msg
viewAttachments status =
    if status.sensitive then
        span [] [ text "Sensitive content" ]

    else
        let
            firstAttachment =
                List.head status.attachments
        in
        case firstAttachment of
            Nothing ->
                div [] []

            Just attachment ->
                viewAttachment status.id attachment


viewAttachment : StatusId -> Attachment -> Html Msg
viewAttachment statusId attachment =
    case attachment.type_ of
        Unknown ->
            nothing

        _ ->
            let
                attachmentHref =
                    "#status:"
                        ++ (statusId |> statusIdToString)
            in
            a
                [ href attachmentHref ]
                [ attachmentMarkup attachment ]


viewSharePath : String -> Html Msg
viewSharePath path =
    div [ class "share" ]
        [ h1 [] [ text "Share photo" ]
        , img [ src ("/thumb?photo=" ++ path) ] []
        , br [] []
        , input
            [ type_ "text"
            , onInput (Share << ShareTextInput)
            , placeholder "title"
            ]
            []
        , br [] []
        , button [ onClick (Share ShareImage) ] [ text "Share" ]
        ]


viewShareUpload : Html Msg
viewShareUpload =
    div [ class "share" ]
        [ h1 [] [ text "Select photo" ]
        , input
            [ type_ "file"
            , id "file-upload"
            , on "change" (succeed (Share ImageSelected))
            ]
            []
        ]


viewShareUploaded : String -> Html Msg
viewShareUploaded dataUrl =
    div [ class "share" ]
        [ h1 [] [ text "Upload photo" ]
        , img [ id "file-upload", src dataUrl ] []
        , br [] []
        , input
            [ type_ "text"
            , onInput (Share << ShareTextInput)
            , placeholder "title"
            ]
            []
        , br [] []
        , button [ onClick (Share UploadImage) ] [ text "Share" ]
        ]



-- Utility functions


htmlTagRegex : Maybe Regex.Regex
htmlTagRegex =
    Regex.fromString "<\\/?[^>]+>"


stripTags : String -> String
stripTags string =
    case htmlTagRegex of
        Nothing ->
            string
                |> Debug.log "Error, not a regex"

        Just regex ->
            string
                |> Regex.replace regex (always "")


nodeIf : Bool -> Html Msg -> Maybe (Html Msg)
nodeIf condition markup =
    if condition then
        Just markup

    else
        Nothing


nothing : Html Msg
nothing =
    text ""
