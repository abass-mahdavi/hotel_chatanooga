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

There are 2 basically two folders containning python code.
- import
- mars_planet_library

There is also a sort of "main" file "application.py" that is simply an entry point to the project for Flask.
The "import" module is independent from the rest. It's part the the project requirements, and it's purpose id to mange the upload of the provided csv file "books.csv".
The "mars_planet_library" folder contains all the logic of the website.
 __init__.py is required for the project organisation (explained here : https://flask.palletsprojects.com/en/1.1.x/patterns/packages/)
 routes.py handles all the interractions with Flask
 database_requests.py handles all the SQL querries
 forms.py is kind of a helper file for routes.py, it handles all the forms on pages where user input is required (registration, login, search and rating)

The underlying database contains four tables. The foolowing sreenshot should be self explanatory:

```
cs_50_books=> \dt
        List of relations
 Schema |  Name   | Type  | Owner
--------+---------+-------+-------
 public | authors | table | me
 public | books   | table | me
 public | reviews | table | me
 public | users   | table | me
(4 rows)

cs_50_books=> SELECT * FROM authors LIMIT 2;
  id   |       name      
-------+------------------
 11502 | Raymond E. Feist
 11503 | Susan Cooper
(2 rows)

cs_50_books=> SELECT * FROM books LIMIT 2;
  id   |    isbn    |         title         | author_id | year
-------+------------+-----------------------+-----------+------
 25001 | 0380795272 | Krondor: The Betrayal |     11502 | 1998
 25002 | 1416949658 | The Dark Is Rising    |     11503 | 1973
(2 rows)

cs_50_books=> SELECT * FROM users LIMIT 2;
 id |      name      |        email        |                        password_hash                        
----+----------------+---------------------+--------------------------------------------------------------
 53 | Dimitri Kissov | hello@dimitri.ru    | $2b$12$yr2PXc3rep94VBl5XCtbheuaVPE7uFgK2RpgFTI9otBFV5UbQA/ye
 54 | Bud Turgidson  | five@stranglove.com | $2b$12$PZ7eyNYffg/sY3mAw6rAge98mgPl4J/NdmweD1DQmK2LxQKEOm81a
(2 rows)

cs_50_books=> SELECT * FROM reviews LIMIT 2;
 id | book_id | user_id | rating |       review        
----+---------+---------+--------+---------------------
 45 |   28172 |      53 |      5 | I became rich
 46 |   28120 |      54 |      4 | strange, so strange
(2 rows)

```

## mars-planet-library pages walkthrough

at the moment this readme file is being written, the website is deployed. its URL is: https://mars-planet-library.herokuapp.com

### home
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10000_home_page.JPG?raw=true" width="75%">

### about
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10100_about.JPG" width="75%">

### registration
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10300_registration_2_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10400_registration_3_.JPG" width="75%">

### login
<img src="(https://github.com/abass-mahdavi/images/blob/master/screenshots/10500_login_1_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10600_login_2_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10700_login_3_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10800_login_4_.JPG" width="75%">

### search
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/10900_search_1_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/11000_search_2_.JPG" width="75%">


### book review and rating
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/11195_book_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/12000_goodreads_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/11300_book_2_.JPG" width="75%">

#### api
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/12111_api_1_2_.JPG" width="75%">
<img src="https://github.com/abass-mahdavi/images/blob/master/screenshots/12211_api_2_2_.JPG   " width="75%">

## the code
The python coded being already available in the repository won't be detailed

The underlying sql have been created using the following commands:

```
CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE
);


CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    isbn VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    author_id INTEGER NOT NULL REFERENCES authors,
    year INTEGER NOT NULL
);


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    email VARCHAR,
    password_hash VARCHAR NOT NULL    
);


CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES books,
    user_id INTEGER NOT NULL REFERENCES users,
    rating INTEGER,
    review VARCHAR
);
```
