from flask import session
from flask_socketio import emit, join_room, leave_room
from ... import socketio




@socketio.on('joined')
def joined(message):
    """Sent by clients when they enter a room.
    A status message is broadcast to all people in the room."""
    room = session.get('room')
    join_room(room)
    emit('status', {'msg': session.get('name') + ' has entered the room.'}, room=room)


def messageReceived(methods=['GET', 'POST']):
    print('message was received!!!')

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