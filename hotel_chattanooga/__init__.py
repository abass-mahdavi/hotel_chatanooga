from flask import Flask
from flask_socketio import SocketIO
from hotel_chattanooga import settings, models

app = Flask(__name__)
app.config["SECRET_KEY"] = settings.SECURITY_SETTINGS.get("APP_SECRET_KEY")
socketio = SocketIO(app)

from hotel_chattanooga import flak_routes
