import os, requests, jsonpickle, json
from time import gmtime, strftime
from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit
from hotel_chattanooga import app, settings, socketio, models
from hotel_chattanooga.models import *


participants = Flak_wrapper()
rooms = Flak_wrapper()
votes = {"yes": 0, "no": 0, "maybe": 0}


@app.route("/")
def index():
    return render_template("index.html", votes=votes)

@app.route("/debug")
def debug():
    return render_template("debug.html",
        rooms=json.dumps(json.loads(jsonpickle.encode(rooms)), indent=2), 
        participants=json.dumps(json.loads(jsonpickle.encode(participants)), indent=2))

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/chat_rooms")
def chat_rooms():
    return render_template("chat_rooms.html", rooms = rooms.members)

@app.route("/chat_room/<chat_room_name>")
def chat_room(chat_room_name):
    room = rooms.get(chat_room_name)
    if room is not None:
        return render_template ("chat_room.html", room = room)
        

@app.route("/vote")
def vote():
    return render_template("vote.html", votes=votes)


@socketio.on("submit vote")
def vote(data):
    selection = data["selection"]
    votes[selection] += 1
    emit("vote totals", votes, broadcast=True)

@socketio.on("register participant")
def register(data):
    participant = Participant(data["name"])
    participants.insert(participant)
    emit("participant registered", json.dumps(vars(participant)), broadcast=True)

@socketio.on("create chat room")
def create_chat_room(data):
    room_name = data["chat_room_name"]
    room = Room(room_name)
    rooms.insert(room)
    rooms_as_json_string = json.dumps([vars(rm) for rm in rooms.members])
    emit("rooms update", rooms_as_json_string, broadcast=True)

@socketio.on("chat room joined")
def chat_room_joined(data):
    participant = participants.get(data["name"])
    room = rooms.get(data["current_room"])
    room.add_participant(participant)
    emit("go to room", data["current_room"])



"""

{
  "py/object": "hotel_chattanooga.models.Participant",
  "name": "yyy",
  "status": "online",
  "current_room": {
    "py/object": "hotel_chattanooga.models.Room",
    "name": "qqq",
    "participants": [],
    "posts": []
  }
}
{
  "py/object": "hotel_chattanooga.models.Room",
  "name": "qqq",
  "participants": [],
  "posts": []
}

"""

@socketio.on("chat room update")
def chat_room_update(data):
    #print(data)
    current_room = rooms.get(data['current_room'])
    author = data['name']
    message = data['post']
    time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    message_to_post = author + ' ' + time_stamp + '\n' + message
    #print(json.dumps(json.loads(jsonpickle.encode(current_room)), indent=2))
    post = Post(author,message,time_stamp)
    #print (json.dumps(vars(post)))
    #print(json.dumps(json.loads(jsonpickle.encode(post)), indent=2))
    current_room.insertPost(post)
    #print(json.dumps([vars(rm) for rm in current_room.posts]))
    print(json.dumps(json.loads(jsonpickle.encode(current_room)), indent=2))


    """
    import jsonpickle # pip install jsonpickle
    import json

    serialized = jsonpickle.encode(obj)
    print(json.dumps(json.loads(serialized), indent=2))

    print(json.dumps(json.loads(jsonpickle.encode(obj)), indent=2))



    print(json.dumps(vars(current_room)))
    rooms_as_json_string = json.dumps([vars(rm) for rm in rooms.members])
    print (rooms_as_json_string)

    #print(message_to_post)
    post = models.Post(author,message,time_stamp)
    current_room.insertPost(post)
    #print(current_room)
    rooms_as_json_string = json.dumps([vars(rm) for rm in rooms.members])
    print (rooms_as_json_string)

    """


"""

{'name': 'dimitri', 'status': 'online', 'current_room': 'politics', 'post': 'hello from dimitri'}

dimitri 2020-05-13 13:47:50
hello

"""
    