from flask import session, Flask, jsonify, json, render_template, request
from flask_socketio import emit, join_room, leave_room
from ..models import Motor, easeFunctions
from ... import socketio
import os
import sys
import time
import RPi.GPIO as GPIO

GPIO.cleanup()

# Initialize pins
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11,GPIO.OUT) # direction
GPIO.setup(13,GPIO.OUT) # step
GPIO.setup(19,GPIO.OUT) # microstep 1
GPIO.setup(21,GPIO.OUT) # microstep 2
GPIO.setup(23,GPIO.OUT) # microstep 3
GPIO.output(19,False)
GPIO.output(21,False)
GPIO.output(23,True)
# Run class after initializing
motor = Motor()
easeFunctions = easeFunctions()        

# @app_views.route('/forwardStart')
# def forwardStart():
#     # GPIO.output(11,True) # set direction
#     motor.motorMove = True
#     motor.Move()
#     return jsonify("OK")

# @app_views.route('/forwardStop')
# def forwardStop():
#     motor.motorMove = False
#     data = {'current_position': motor.stepsTaken}
#     return jsonify(data)

@socketio.on('joined')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    join_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

@socketio.on('forward')
def forward(json, methods=['GET','POST']):
    print(str(json))
    if json['shouldMove'] == True:
        print("gogogog")
        motor.motorMove = True
        motor.Move()
        json['motorMoveStatus'] = motor.motorMove
        emit('my response', json, callback=messageReceived)
    else:
        print('nonono')
        motor.motorMove = False
        json['motorMoveStatus'] = motor.motorMove
        json['currentPosition'] = {'current_position': motor.stepsTaken}
        emit('my response', json, callback=messageReceived)



@socketio.on('compute')
def yellow(json, methods=['GET', 'POST']):
    # print('received eggplant: ' + str(json))
    json['net'] = int(json['value1']) * int(json['value2'])
    
    print(str(json))
    emit('my response', json, callback=messageReceived)

@socketio.on('acknowledge')
def acknowledge(json, methods=['GET', 'POST']):
    # print('received eggplant: ' + str(json))    
    print(str(json))
    json['response'] = 'And hello from server!'
    emit('my response', json, callback=messageReceived)