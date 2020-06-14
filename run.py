from app import create_app, socketio

app = create_app(debug=True, host='0.0.0.0')

if __name__ == '__main__':
    socketio.run(app)