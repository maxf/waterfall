* New page

- `/?code=` return from auth

- anything else
-- fn: `checkAuthToken`
-- port: `localStorageGetitem`
-- sub: `localStorageRetrievedItem` -> Msg `AuthTokenRetrievedFromLocalStorage`
--- if no token -> go to router
--- if token -> fn: `fetchCurrentuserdetails`
---- Http.request verify_credentials -> Msg `UserDetailsFetched`
----- if ?code= -> go to home page
----- otherwise router
