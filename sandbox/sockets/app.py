import RPi.GPIO as GPIO
import time
# from adafruit_servokit import ServoKit 

GPIO.cleanup()

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings(False)
GPIO.setup(8,GPIO.OUT)

# kit = ServoKit(channels=16)


from flask import Flask, jsonify, render_template, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = '2spooky4u'
socketio = SocketIO(app)

@app.route('/')
def sessions():
    return render_template('index.html')

def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

# @socketio.on('servo')
# def handle_servo(json, methods=['GET', 'POST']):
#     if json['event'] == 'hold':
#         kit.continuous_servo[0].throttle = 0
#     else:
#         kit.continuous_servo[0].throttle = 1

@socketio.on('light')
def handle_light(json, methods=['GET', 'POST']):
    if json['event'] == 'hold':
        GPIO.output(8, GPIO.HIGH)
    else:
        GPIO.output(8, GPIO.LOW)

    socketio.emit('my response', json, callback=messageReceived)
        


global counter
counter = 0

@socketio.on('which_fruit')
def handle_my_custom_event(json, methods=['GET', 'POST']):
    # print('received eggplant: ' + str(json))
    print(str(json))

    global counter

    if json['type'] == 'banana':
        print('yoyo bananas')
        counter += 1
        print(counter)
        json['bananaLevel'] = counter

    if json['event'] == 'hold':
        json['shouldHold'] = True
    else:
        json['shouldHold'] = False

    socketio.emit('my response', json, callback=messageReceived)
        

if __name__ == '__main__':
    socketio.run(app, debug=True, port=5000, host="0.0.0.0")