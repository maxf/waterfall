* New page

- `/?code=` return from auth

- anything else
-- fn: `checkAuthToken`
-- port: `localStorageGetitem`
-- sub: `localStorageRetrievedItem` -> Msg `AuthTokenRetrievedFromLocalStorage`
--- if no token -> go to login page ### CHANGE to just go to router
--- if token -> fn: `fetchCurrentuserdetails`
---- Http.request verify_credentials -> Msg `UserDetailsFetched` -> go to router.
