import React, { createContext, useState, useEffect } from 'react';

import { makeDeviceBlink as makeDeviceBlinkAPI, shutdownDevice as shutdownDeviceAPI, restartDevice as restartDeviceAPI, closeServer as closeServerAPI } from '../api/deviceControls';
import { socket, emitSocketEvent as emit } from '../api/socketEvents';
export const AppSettingsContext = createContext();


const AppSettingsContextProvider = ({ children }) => {
    const [apiRoutes, setApiRoutes] = useState({
        development: 'http://127.0.0.1:5000',
        production: 'http://0.0.0.0:5000',
    });

    const [ status, setStatus ] = useState([
        {
            message: "Idle, waiting for commands",
            type: 1
        },
        {
            message: "Moving forwards",
            type: 2
        }
    ]);


    // useEffect(() => {
    // });

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

    const blinkLed = () => {
        async function fetchData() {
            try {
                const result = await makeDeviceBlinkAPI();
                console.log(result);
            } catch(error) {
                console.log(error);
            }
        }
        fetchData();
    }

    const testSocketConnection = () => {        
        emit('acknowledge', {message: "Hello from client!"});
        
        socket.on( 'my response', function( data ) {
            console.log(data);
        })
    }

    return (
        <AppSettingsContext.Provider value={{ apiRoutes, blinkLed, testSocketConnection, status }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;