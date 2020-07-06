from flask import session, Flask, jsonify, json, render_template, request
from flask_socketio import emit, join_room, leave_room, disconnect
import os
import sys
import time
from ... import socketio

def socketCallback(methods=['GET', 'POST']):
    print('message was received')

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
    json['response'] = 'Socket + server connection established.'

    emit('my response', json, callback=socketCallback)

@socketio.on('disconnect')
def acknowledgeDisconnect():
    print('Client disconnected', request.sid)

@socketio.on('retrieve session info')
def sessionInfo(json, methods=['GET']):
    print('connected!')
    json['message'] = 'Connect!'
    emit('session information', json, callback=socketCallback)