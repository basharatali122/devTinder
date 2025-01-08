# DevTinder APIs

## AuthRouter
-POST /signup
-POST /login
-POST /logout

## ProfileRouter
-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## ConnectionRequestRouter
-POST /request/send/intereted/:userId
-POST /request/send/ingnore/:userId
-POST /request/review/accepeted/:requestId
-POST /request/review/rejected/:requestId

## userRouter
-GET /user/requests / recevied
-GET /connections
-GET /feed - Gets you the profiles of other users on platform


Status: ignore,interested,accepeted,reject