# Steps to Start the App

## Install the Server Dependencies
## In the Server Directory there's a .env file. Change the value of mongodb inside the file. Set the value as your mongodb connection url.
## Now start the server by npm start

# Postman:

## Headers: 1) KEY: Accept VALUE: application/json 2) KEY: Content-Type VALUE: application/json
## Body: raw

# User:

## register: POST: http://localhost:5500/api/auth/register, body { "username": "name", "email": "a@gmail.com", "password":"12345678"}
## login: POST: http://localhost:5500/api/auth/login, body { "username": "name", "password":"12345678"}
## logout: GET: http://localhost:5500/api/auth/logout/{_id}

# Messages:

## add message: POST: http://localhost:5500/api/messages/addmsg, body { "to": "_id", "message": "contect"}
## delete message: DELETE: http://localhost:5500/api/messages/deletemsg/{messageId}
## get all messages for users: GET: http://localhost:5500/api/messages/getallmsg
## get all unread messages for a specific user: PUT: http://localhost:5500/api/messages/getallunreadmsg
## read unread message(one): GET: http://localhost:5500/api/messages/getunreadmsg, body { "to": "_id"} 