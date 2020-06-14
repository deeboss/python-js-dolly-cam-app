from flask import Flask
from flask_socketio import SocketIO

socketio = SocketIO()


def create_app(debug=False, host='0.0.0.0'):
    """Create an application."""
    app = Flask(__name__)
    app.debug = debug
    app.host = host
    app.config['SECRET_KEY'] = 'gjr39dkjn344_!67#'

    from .main import main as main_blueprint
    app.register_blueprint(main_blueprint)

    socketio.init_app(app)
    return app
