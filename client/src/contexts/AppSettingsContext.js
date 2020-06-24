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
        key: '',
        isReleased: true,
    });

    const handleKeyDown = (e) => {
        switch(e.key) {
            case "ArrowUp":
                console.log("Pressed: ArrowUp!");
                setActiveKeystroke({ key: 'ArrowUp', isReleased: false});
                break;
            case "ArrowDown":
                console.log("Pressed: ArrowDown!");
                setActiveKeystroke({ key: 'ArrowDown', isReleased: false});
                break;
            case "ArrowLeft":
                console.log("Pressed: ArrowLeft!");
                setActiveKeystroke({ key: 'ArrowLeft', isReleased: false});
                break;
            case "ArrowRight":
                console.log("Pressed: ArrowRight!");
                setActiveKeystroke({ key: 'ArrowRight', isReleased: false});
                break;

            case "Escape":
                console.log("Pressed: Escape!");
                setActiveKeystroke({ key: 'Escape', isReleased: false});
                break;

            case "z":
                console.log("Pressed: z");
                setActiveKeystroke({ key: 'z', isReleased: false});
                break;

            case "x":
                console.log("Pressed: x");
                setActiveKeystroke({ key: 'x', isReleased: false});
                break;

            case "c":
                console.log("Pressed: c");
                setActiveKeystroke({ key: 'c', isReleased: false});
                break;

            case "r":
                console.log("Pressed: r");
                setActiveKeystroke({ key: 'r', isReleased: false});
                break;
                
            default:
                break;
        }
    }

    const handleKeyUp = (e) => {
        switch(e.key) {
            case "ArrowUp":
                console.log("Released: ArrowUp!");
                setActiveKeystroke({ key: 'ArrowUp', isReleased: true});
                break;
            case "ArrowDown":
                console.log("Released: ArrowDown!");
                setActiveKeystroke({ key: 'ArrowDown', isReleased: true});
                break;
            case "ArrowLeft":
                console.log("Released: ArrowLeft!");
                setActiveKeystroke({ key: 'ArrowLeft', isReleased: true});
                break;
            case "ArrowRight":
                console.log("Released: ArrowRight!");
                setActiveKeystroke({ key: 'ArrowRight', isReleased: true});
                break;

            case "Escape":
                console.log("Released: Escape!");
                setActiveKeystroke({ key: 'Escape', isReleased: true});
                break;

            case "z":
                console.log("Released: z");
                setActiveKeystroke({ key: 'z', isReleased: true});
                break;

            case "x":
                console.log("Released: x");
                setActiveKeystroke({ key: 'x', isReleased: true});
                break;

            case "c":
                console.log("Released: c");
                setActiveKeystroke({ key: 'c', isReleased: true});
                break;

            case "r":
                console.log("Released: r");
                setActiveKeystroke({ key: 'r', isReleased: true});
                break;
                
            default:
                break;
        }
    }

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
        <AppSettingsContext.Provider value={{ apiRoutes, blinkLed, testSocketConnection, status, activeKeystroke, setActiveKeystroke, handleKeyDown, handleKeyUp }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;