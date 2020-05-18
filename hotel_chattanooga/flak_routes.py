import os, requests, jsonpickle, json, ast, time
from time import gmtime, strftime
from flask import Flask, jsonify, render_template, request, redirect, url_for
from flask_socketio import SocketIO, emit
from apscheduler.schedulers.background import BackgroundScheduler
from hotel_chattanooga import app, settings, socketio, models
from hotel_chattanooga.models import *



"""
https://www.techcoil.com/blog/how-to-use-flask-apscheduler-in-your-python-3-flask-application-to-run-multiple-tasks-in-parallel-from-a-single-http-request/


from flask import Flask
from flask_apscheduler import APScheduler
 
import time
 
app = Flask(__name__)
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()
 
@app.route('/')
def welcome():
    return 'Welcome to flask_apscheduler demo', 200
 
@app.route('/run-tasks')
def run_tasks():
    for i in range(10):
        app.apscheduler.add_job(func=scheduled_task, trigger='date', args=[i], id='j'+str(i))
 
    return 'Scheduled several long running tasks.', 200
 
def scheduled_task(task_id):
    for i in range(10):
        time.sleep(1)
        print('Task {} running iteration {}'.format(task_id, i))
         
app.run(host='0.0.0.0', port=12345)



"""

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
    if(participants.get(data["name"])):
        emit("participant registered","exisiting_user")
    else:
        participant = Participant(data["name"])
        participants.insert(participant)
        emit("participant registered", json.dumps(json.loads(jsonpickle.encode(participant)), indent=2))

@socketio.on("create chat room")
def create_chat_room(data):
    room_name = data["chat_room_name"]
    if (rooms.get(room_name)):
        emit("room exists already")
    else:
        room = Room(room_name)
        rooms.insert(room)
        rooms_as_json_string = json.dumps(json.loads(jsonpickle.encode(participants)), indent=2)
        emit("rooms update", rooms_as_json_string, broadcast=True)


@socketio.on("chat room joined")
def chat_room_joined(data):
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
    

@socketio.on("new post")
def new_postdata(data):
    current_room = rooms.get(data['current_room'])
    author_name = data['name']
    message = data['post']
    time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    #message_to_post = author + ' ' + time_stamp + '\n' + message
    post = Post(author_name,message,time_stamp)
    current_room.insertPost(post)
    emit("post received", current_room.name, broadcast=True)


@socketio.on("go to chatrooms board")
def go_to_chatrooms_board(data):
    current_room = rooms.get(data['current_room'])
    participant = participants.get(data['name'])
    current_room.remove_participant(participant)
    announcement = participant.name + " left "
    time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    participants_left_post = Post(concierge.name,announcement,time_stamp)
    current_room.insertPost(participants_left_post)
    emit("participant ready to go to chatrooms board")




"""
@socketio.on("go to chatrooms board")
def go_to_chatrooms_board(data):

        announcement = participant.name + " left "
        time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        participants_left_post = Post(concierge.name,announcement,time_stamp)
        current_room.insertPost(participants_left_post)


chatBots

    # Make a get request to get the latest position of the international space station from the opennotify api.
    response = requests.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random")

    # Print the the response.
    print(response.json()['message'])
"""
chatBots_room = Room("chatBots")
donald_J_Trump = Participant("Donald J Trump")
rooms.insert(chatBots_room)
participants.insert(donald_J_Trump)

def chatBots():
    trump_quote = requests.get("https://api.whatdoestrumpthink.com/api/v1/quotes/random").json()['message']
    time_stamp = strftime("%Y-%m-%d %H:%M:%S", gmtime())
    trump_post = Post("Donald J Trump",trump_quote,time_stamp)
    chatBots_room.insertPost(trump_post)



scheduler = BackgroundScheduler()
job = scheduler.add_job(chatBots, 'interval', seconds=20)
scheduler.start()



