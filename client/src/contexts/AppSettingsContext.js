import React, { createContext, useState, useEffect } from 'react';

import { makeDeviceBlink as makeDeviceBlinkAPI, shutdownDevice as shutdownDeviceAPI, restartDevice as restartDeviceAPI, closeServer as closeServerAPI } from '../api/deviceControls';
import { socket, emitSocketEvent as emit } from '../api/socketEvents';
export const AppSettingsContext = createContext();


const AppSettingsContextProvider = ({ children }) => {
    const [apiRoutes, setApiRoutes] = useState({
        development: 'http://127.0.0.1:5000',
        production: 'http://0.0.0.0:5000',
    });

    const [activeKeystroke, setActiveKeystroke] = useState({
        key: null,
        isReleased: true,
    });

    const handleKeyDown = (e) => {
        switch(e.key) {
            case "ArrowUp":
                setActiveKeystroke({ key: 'ArrowUp', isReleased: false});
                break;
            case "ArrowDown":
                setActiveKeystroke({ key: 'ArrowDown', isReleased: false});
                break;
            case "ArrowLeft":
                setActiveKeystroke({ key: 'ArrowLeft', isReleased: false});
                break;
            case "ArrowRight":
                setActiveKeystroke({ key: 'ArrowRight', isReleased: false});
                break;

            case "Escape":
                setActiveKeystroke({ key: 'Escape', isReleased: false});
                break;

            case "z":
                setActiveKeystroke({ key: 'z', isReleased: false});
                break;

            case "x":
                setActiveKeystroke({ key: 'x', isReleased: false});
                break;

            case "c":
                setActiveKeystroke({ key: 'c', isReleased: false});
                break;

            case "r":
                setActiveKeystroke({ key: 'r', isReleased: false});
                break;
                
            default:
                break;
        }
    }

    const handleKeyUp = (e) => {
        switch(e.key) {
            case "ArrowUp":
                setActiveKeystroke({ key: 'ArrowUp', isReleased: true});
                break;
            case "ArrowDown":
                setActiveKeystroke({ key: 'ArrowDown', isReleased: true});
                break;
            case "ArrowLeft":
                setActiveKeystroke({ key: 'ArrowLeft', isReleased: true});
                break;
            case "ArrowRight":
                setActiveKeystroke({ key: 'ArrowRight', isReleased: true});
                break;

            case "Escape":
                setActiveKeystroke({ key: 'Escape', isReleased: true});
                break;

            case "z":
                setActiveKeystroke({ key: 'z', isReleased: true});
                break;

            case "x":
                setActiveKeystroke({ key: 'x', isReleased: true});
                break;

            case "c":
                setActiveKeystroke({ key: 'c', isReleased: true});
                break;

            case "r":
                setActiveKeystroke({ key: 'r', isReleased: true});
                break;
                
            default:
                break;
        }
    }

    const [ statusList ] = useState([
        {
            message: "Disconnected",
            type: 0
        },
        {
            message: "Connected",
            type: 1
        },
        {
            message: "Idle, waiting for commands",
            type: 1
        },
        {
            message: "Moving forwards",
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
        <AppSettingsContext.Provider value={{ apiRoutes, blinkLed, testSocketConnection, statusList, status, setStatus, activeKeystroke, setActiveKeystroke, handleKeyDown, handleKeyUp }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;