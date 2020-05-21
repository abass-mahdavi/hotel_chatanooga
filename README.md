# Project 2

Web Programming with Python and JavaScript


# Hotel Chatanooga
"Hotel Chatanooga" is a chatroom application coded with Python on the server side and witj JavaScript on the client side
context: CS50 Web Programming Project 2

## Project structure: 
The project is organised as follows:

```
├── application.py
├── hotel_chattanooga
│   ├── flak_routes.py
│   ├── __init__.py
│   ├── models.py
│   ├── quotes_generator.py
│   ├── settings.py
│   ├── static
│   │   ├── chat_room.js
│   │   ├── chat_rooms.js
│   │   ├── index.js
│   │   ├── layout.js
│   │   ├── login.js
│   │   └── style.css
│   └── templates
│       ├── chat_room.html
│       ├── chat_rooms.html
│       ├── debug.html
│       ├── index.html
│       ├── layout.html
│       └── login.html
├── README.md
└── requirements.txt

```

On the server side, we these modules:
* routes.py, which contains all the code that uses Flask framework. The routes, and the sockets.
* models.py handles the the objects used by routes. Theses object are python classes that represent the 
  * participants (class participant), 
  * the chatrooms (class room), the posts (class post), and 
  * a class designated as "wrapper" that basically is an arry of object plus some tailored getters and setters. This wrapper class is used by routes.py to handle lists of participants or lists of chatrooms.
* quoteGenerator.py which is a set of functions that allows to some chatbots to fetch some quotes either through lists or through web apis

There is also a sort of "main" file "application.py" that is simply an entry point to the project for Flask, and
 __init__.py is required for the project organisation 8makes divers modules work toghter and handle environment variables).
 

On the client side, the application uses these HTML pages:
* index.html  (routes to some other pages based on the context)
* login.html  (invites the user to give his or her username, no password is required)
* rooms.html (displays the chatrooms and allows to create new one)
* room.html (that is the chatroom)

these html pages are "controled" by their respective js pages, for example rooms.html is managed by roomd.js
login.js, rooms.js and room.js communicate with the server (through routes.py)using websockets to send or receive datas.

Here is a link to a video demo:  
        https:/youtu.be/igve0n_gupg




