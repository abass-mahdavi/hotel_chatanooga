import os, requests, json

from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO, emit
from hotel_chattanooga import app, settings, socketio, models


participants = models.Flak_wrapper()
rooms = models.Flak_wrapper()
votes = {"yes": 0, "no": 0, "maybe": 0}


@app.route("/")
def index():
    return render_template("index.html", votes=votes)

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/chat_rooms")
def chat_rooms():
    return render_template("chat_rooms.html", rooms = rooms.members)

@app.route("/chat_room/<chat_room_name>", methods=["GET", "POST"])
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
    participant = models.Participant(data["name"])
    participants.insert(participant)
    message = json.dumps(vars(participant))
    print(message)
    emit("participant registered", json.dumps(vars(participant)), broadcast=True)

@socketio.on("create chat room")
def create_chat_room(data):
    room_name = data["chat_room_name"]
    room = models.Room(room_name)
    rooms.insert(room)
    #rooms__.append(data["chat_room_name"])
    #print (json.dumps([ob.__dict__ for ob in rooms.members]))
    rooms_as_json_string = json.dumps([vars(rm) for rm in rooms.members])
    print (rooms_as_json_string)
    emit("rooms update", rooms_as_json_string, broadcast=True)