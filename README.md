# Steps to Start the App

## Install the Public Dependencies
## Install the Server Dependencies
## In the Server Directory there's a .env file. Change the value of mongodb inside the file. Set the value as your mongodb connection url.
## Now start the server by yarn start
## Now start the react by yarn start
## And the chat application would be running successfully by now.

# Postman:
# Headers: 1) KEY: Accept VALUE: application/json 2) KEY: Content-Type VALUE: application/json
# Body: raw

# User:
# register: POST: http://localhost:5000/api/auth/register, body { "username": "name", "email": "a@gmail.com", "password":"12345678"}
# login: POST: http://localhost:5000/api/auth/login, body { "username": "name", "password":"12345678"}
# logout: GET: http://localhost:5000/api/auth/logout/{_id}

# Messages:
# add message: POST: http://localhost:5000/api/messages/addmsg, body { "from": "_id", "to": "_id", "message": "contect"}
# get message: POST: http://localhost:5000/api/messages/getmsg, body { "from": "_id", "to": "_id"}
# delete message: DELETE: http://localhost:5000/api/messages/deletemsg/{messageId}, body {"sender": {senderId}}
# get all messages for users: GET: http://localhost:5000/api/messages/getallmsg, body {"senderId": {senderId}}
# get all unread messages for a specific user: PUT: http://localhost:5000/api/messages/getallunreadmsg, body {"senderId": {senderId}}
# read unread message(one): GET: http://localhost:5000/api/messages/getunreadmsg, body {"from": "_id", "to": "_id"}