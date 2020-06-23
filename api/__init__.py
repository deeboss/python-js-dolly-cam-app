from flask import Flask, jsonify, json, render_template, request
from flask_socketio import SocketIO
from flask_cors import CORS, cross_origin

socketio = SocketIO()

def create_app(debug=False):
    """Create an application."""

    app = Flask(__name__)
    # Enable cors
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'
    
    app.debug = debug
    app.config['SECRET_KEY'] = '2spooky4u'

    from .v1 import app_template_views, app_views
    app.register_blueprint(app_template_views)
    app.register_blueprint(app_views)

    socketio.init_app(app, cors_allowed_origins="*")
    return app
