from . import app_views
from flask import session, Flask, jsonify, json, render_template, request
from flask_socketio import emit, join_room, leave_room
from ..models import Servo
import os
import sys
import time
import RPi.GPIO as GPIO
from ... import socketio

servo = Servo()

def socketCallback(methods=['GET', 'POST']):
    print('message was received')

@socketio.on('turn vehicle')
def servoMove(json, methods=['GET','POST']):
    # set turning to start or stop
    '''
    dir = -1, or 1
    zone = int
    '''
    servo.moveServo(json['dir'], json['zone'])
    emit('my response', json, callback=socketCallback)