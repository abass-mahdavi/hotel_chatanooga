import os, requests, jsonpickle, json, ast
from time import gmtime, strftime
from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit
from hotel_chattanooga import app, settings, socketio, models
from hotel_chattanooga.models import *


participants = Flak_wrapper()
rooms = Flak_wrapper()

concierge = Participant("Concierge")
participants.insert(concierge)



@app.route("/")
def index():
    return render_template("index.html")

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

@socketio.on("register participant")
def register(data):
    participant = Participant(data["name"])
    participants.insert(participant)
    print(json.dumps(json.loads(jsonpickle.encode(participant)), indent=2))
    emit("participant registered", json.dumps(json.loads(jsonpickle.encode(participant)), indent=2))

@socketio.on("create chat room")
def create_chat_room(data):
    room_name = data["chat_room_name"]
    room = Room(room_name)
    rooms.insert(room)
    rooms_as_json_string = json.dumps(json.loads(jsonpickle.encode(participants)), indent=2)
    emit("rooms update", rooms_as_json_string, broadcast=True)


@socketio.on("chat room joined")
def chat_room_joined(data):


    print(f"data =  {data}")
    print(f'data["name"] =  {data["name"]}')
    print(f'data["current_room"] =  {data["current_room"]}')
    print(f'data["selected_room"] =  {data["selected_room"]}')


    participant = participants.get(data["name"])
    new_room = rooms.get(data["selected_room"])
    time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    if (participant.current_room):
        previous_room = rooms.get(participant.current_room)
        previous_room.remove_participant(participant)
        announcement = participant.name + " left "
        participants_left_post = Post(concierge.name,announcement,time_stamp)
        previous_room.insertPost(participants_left_post)
    new_room.add_participant(participant)
    emit("go to room", data["selected_room"])    
    announcement = participant.name + " joined "
    participant_joined_post = Post(concierge.name,announcement,time_stamp)
    new_room.insertPost(participant_joined_post)
    



@socketio.on("chat room left")
def chat_room_left(data):
    print(data)


@socketio.on("new post")
def new_postdata(data):
    current_room = rooms.get(data['current_room'])
    author_name = data['name']
    message = data['post']
    time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    #message_to_post = author + ' ' + time_stamp + '\n' + message
    post = Post(author_name,message,time_stamp)
    current_room.insertPost(post)
    #print(json.dumps([vars(rm) for rm in current_room.posts]))
    print(json.dumps(json.loads(jsonpickle.encode(current_room)), indent=2))
    emit("post received", current_room.name, broadcast=True)


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
    