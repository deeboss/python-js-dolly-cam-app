import io from 'socket.io-client'

// export const socket = io('ws://192.168.1.16:5000', {transports: ['websocket']});

export const socket = io.connect('ws://192.168.1.16:5000', {transports: ['polling']});
export const emitSocketEvent = (name, object) => {
  socket.emit(name, object);
}