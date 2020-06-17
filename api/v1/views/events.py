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

@socketio.on('joined')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    join_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)

def socketCallback(methods=['GET', 'POST']):
    print('message was received')

@socketio.on('control vehicle')
def motorMove(json, methods=['GET','POST']):
    # set movement start or stop
    if json['motorMove'] == True:
        # set direction forwards or backwards
        GPIO.output(11,json['shouldMoveForwards']) # 'shouldMoveForwards' will return True or False
        motor.motorMove = True
        motor.Move()
        emit('my response', json, callback=socketCallback)
    else:
        motor.motorMove = False
        json['current_position'] = motor.stepsTaken
        emit('vehicle position data', json, callback=socketCallback)


@socketio.on('compute')
def yellow(json, methods=['GET', 'POST']):
    # print('received eggplant: ' + str(json))
    json['net'] = int(json['value1']) * int(json['value2'])
    
    print(str(json))
    emit('my response', json, callback=socketCallback)

@socketio.on('acknowledge')
def acknowledge(json, methods=['GET', 'POST']):
    # print('received eggplant: ' + str(json))    
    print(str(json))
    json['response'] = 'And hello from server!'
    emit('my response', json, callback=socketCallback)