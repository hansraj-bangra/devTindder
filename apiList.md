# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET / profile/view    
- PATCH / profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/intersted/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:request
- POST /request/review/rejected/:request

## userRouter
- GET /user/connection
- GET /user/requests/received
- GET /user/feed - Gets you the profiles of other users on platform

Status - ignore, intrested, accepeted, rejected