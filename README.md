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