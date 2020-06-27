import React, { createContext, useState, useEffect } from 'react';

import { makeDeviceBlink as makeDeviceBlinkAPI, shutdownDevice as shutdownDeviceAPI, restartDevice as restartDeviceAPI, closeServer as closeServerAPI } from '../actions/deviceActions';
import { saveWaypoint as saveWaypointAPI } from '../actions/movementActions';
import { socket, emitSocketEvent as emit } from '../actions/socketActions';

export const AppSettingsContext = createContext();


const AppSettingsContextProvider = ({ children }) => {

    const [activeKeystroke, setActiveKeystroke] = useState({
        key: null,
        isReleased: true,
    });

    const [ mobileOrientation , setMobileOrientation ] = useState(0);

    const [ hasSocketConnection, setHasSocketConnection ] = useState(false);

    const checkSocketConnection = () => {
        setHasSocketConnection(socket.connected);
        setStatus(statusList[1]);

        if (socket.connected) {
            setHasSocketConnection(socket.connected);
            setStatus(statusList[2]);

        } else {
            setHasSocketConnection(socket.connected);
            setStatus(statusList[0]);
        }
    }

    const [ statusList ] = useState([
        {
            message: "Disconnected",
            type: 0
        },
        {
            message: "Attempting Connection...",
            type: 1
        },
        {
            message: "Connected",
            type: 2
        },
        {
            message: "Idle, waiting for commands",
            type: 2
        },
        {
            message: "Moving forwards",
            type: 2
        },
        {
            message: "Moving backwards",
            type: 2
        }
    ]);

    const [ status, setStatus ] = useState(statusList[0]);

    const closeServer = () => {
        async function fetchData() {
            try {
                const result = await closeServerAPI();
                console.log(result);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }

    const restartDevice = () => {
        async function fetchData() {
            try {
                const result = await restartDeviceAPI();
                console.log(result);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }

    const shutdownDevice = () => {
        async function fetchData() {
            try {
                const result = await shutdownDeviceAPI();
                console.log(result);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }

    // const blinkLed = () => {
    //     async function fetchData() {
    //         try {
    //             const result = await makeDeviceBlinkAPI();
    //             console.log(result);
    //         } catch(error) {
    //             console.log(error);
    //         }
    //     }
    //     fetchData();
    // }

    const blinkLed = () => {
        const result = makeDeviceBlinkAPI();
        console.log(result);
    }

    socket.on('connect', function(){
        // console.log("socket server has been connected");
        setHasSocketConnection(true);
        // emit('retrieve session info', {message: "We've connected!"});

        // socket.on('session information', function(data) {
        //     console.log(data);
        // })
    });

    socket.on('disconnect', function(){
        // console.log("socket server has been disconnected");
        setHasSocketConnection(false);
    });

    const testSocketConnection = () => {        
        emit('acknowledge', {message: "Hello from client!"});
        
        // socket.on( 'my response', function( data ) {
        //     console.log(data);
        // })
    }

    return (
        <AppSettingsContext.Provider value={{
            mobileOrientation , setMobileOrientation,
            closeServer, restartDevice, shutdownDevice, blinkLed,
            testSocketConnection,
            statusList, status, setStatus,
            activeKeystroke, setActiveKeystroke,
            hasSocketConnection, setHasSocketConnection, checkSocketConnection,
            }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;