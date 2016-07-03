MongoDB Connect
===============

This is a two tier project. I am creating a MongoDB powered backend for a sample app I am creating as a four day challenege.


##Endpoints:

###/api/v1

- /api/v1/messages: GET request for all the messages based on popularity (highest rated first). Not parameter required or accepted.

- /api/v1/new_message: POST request to add a new message. Must be authenticated to post a new message. Single parameter `message` is required and accepted.

- /api/v1/upvote: PATCH request to add an upvote to a message. Single paramter `id`, the ObjectID for the message. 

- /api/v1/upvote: PATCH request to add an upvote to a message. Single paramter `id`, the ObjectID for the message. 

- /api/v1/filtered: GET request to get a filtered result of messages. Query parameter is `filtered` and available filters are `['popularity' , 'reverse_popularity', 'earliest', 'latest'] `

###/users/

- /users/signup: POST request for adding a new user. Parameters `username`, `email`, and `password` accepted and required. Will return a result unsuccessful if any parameters are missing, username or email is already in use or successful if everything goes well. 

- /users/login: POST request for logging in a user. Parameters `username`, and `password` accepted and required. Will return a result unsuccessful if there is a mismatch or successful and adds teh user to the session if the credentials are correct. Cannot log in if already logged in.

- /users/logout: GET request for logging out a user. No parameter required or accepted. Will log out if logged in, return unsuccessful if not currently logged in.

##Message structure:
At the heart of this api is Message Object of the form:
``` javascript

{
    'message': '...',
    'author': '...',
    'popularity': x,
    'timestamp': y
}

```