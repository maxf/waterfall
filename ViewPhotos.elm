module ViewPhotos exposing (viewPhotos)

import Html exposing (Html, div, h1, h2, li, img, text, a, button)
import Html.Keyed exposing (ul)
import Html.Attributes exposing (src, id, style, class, href)
import Html.Events exposing (onClick)
import Time.DateTime exposing (DateTime, toTimestamp)
import Dict
import Http exposing (encodeUri)
import Model exposing (Model, DisplayDate(Date), photoShown, photoMetadata, albumShown, dateShown)
import Types exposing (PhotoMetadata, FileName, dateToString)
import Update exposing (Msg(UserAskedToDeleteAPhoto, UserAskedToRotateAPhoto), toHash)


viewPhotos : Model -> DateTime -> Html Msg
viewPhotos model date =
    let
        dateExifString =
            (date |> toTimestamp) / 1000 |> round

        photosForDate =
            Dict.get dateExifString (photoMetadata model)
    in
        div
            [ id "photos" ]
            [ h1 [] [ date |> dateToString |> text ]
            , case photosForDate of
                Nothing ->
                    div [] [ text "No photos for that date" ]

                Just photos ->
                    div [] [ viewThumbnails model photos ]
            , viewPhoto model date (model |> photoShown)
            ]


viewThumbnails : Model -> List PhotoMetadata -> Html Msg
viewThumbnails model metadataList =
    div
        []
        [ h2 [] [ text ((List.length metadataList |> toString) ++ " photos") ]
        , ul
            [ class "contact-print" ]
            (List.map
                (viewThumbnail model)
                (List.sortBy .dateCreated metadataList)
            )
        ]


viewThumbnail : Model -> PhotoMetadata -> ( String, Html Msg )
viewThumbnail model metadata =
    let
        photoId =
            toHash (albumShown model) (Just metadata.relativeFilePath) (dateShown model)

        photoLink =
            (albumShown model |> Maybe.withDefault "")
            ++ "/" ++ metadata.relativeFilePath
    in
        ( metadata.relativeFilePath
        , li
            []
            [ div
                []
                [ a [ href photoId ]
                    [ img
                        [ src ("/thumb?photo=" ++ encodeUri photoLink)
                        , class "thumbnail"
                        ]
                        []
                    ]
                ]
            ]
        )


viewPhoto : Model -> DateTime -> Maybe FileName -> Html Msg
viewPhoto model photoDate fileName =
    case fileName of
        Nothing ->
            div [ style [ ( "display", "none" ) ] ] []

        Just name ->
            let
                link =
                    toHash (albumShown model) Nothing (Date photoDate)
                imgSrc =
                    (albumShown model |> Maybe.withDefault "")
                    ++ "/" ++ name |> encodeUri
            in
                div [ class "lightbox" ]
                    [ div [ class "lightbox-inner" ]
                        [ a [ href link ]
                            [ img [ src ("/preview?photo=" ++ imgSrc) ] [] ]
                        ]
                    , div [ class "buttons" ]
                        [ button
                            [ onClick (UserAskedToDeleteAPhoto name) ]
                            [ text "🗑" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 90 name) ]
                            [ text "↻" ]
                        , button
                            [ onClick (UserAskedToRotateAPhoto 270 name) ]
                            [ text "↺" ]
                        ]
                    ]
