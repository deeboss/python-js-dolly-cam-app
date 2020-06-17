from api import create_app, socketio

app = create_app(debug=True)

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, host='0.0.0.0')