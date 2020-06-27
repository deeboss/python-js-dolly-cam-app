import React, { createContext, useState, useEffect } from 'react';

import { makeDeviceBlink as makeDeviceBlinkAPI, shutdownDevice as shutdownDeviceAPI, restartDevice as restartDeviceAPI, closeServer as closeServerAPI } from '../api/deviceControls';
import { saveWaypoint as saveWaypointAPI } from '../api/movementControls';
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

    const [ mobileOrientation , setMobileOrientation ] = useState(0);

    const [ vehicleStepsTaken, setVehicleStepsTaken ] = useState(0);

    const handleKeyDown = (e) => {
        
        if (!activeKeystroke.isReleased) {
            return
        }
        switch(e.key) {
            case "ArrowUp":
                setActiveKeystroke({ key: 'ArrowUp', isReleased: false});
                moveVehicle(-1, true);
                break;
            case "ArrowDown":
                setActiveKeystroke({ key: 'ArrowDown', isReleased: false});
                moveVehicle(1, true);
                break;
            case "ArrowLeft":
                setActiveKeystroke({ key: 'ArrowLeft', isReleased: false});
                turnVehicle(-1, 5);
                break;
            case "ArrowRight":
                setActiveKeystroke({ key: 'ArrowRight', isReleased: false});
                turnVehicle(1, 5);
                break;

            case "Escape":
                setActiveKeystroke({ key: 'Escape', isReleased: false});
                break;

            case "a":
                setActiveKeystroke({ key: 'a', isReleased: false});
                break;

            case "s":
                setActiveKeystroke({ key: 's', isReleased: false});
                break;

            case "d":
                setActiveKeystroke({ key: 'd', isReleased: false});
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
                moveVehicle(0, false);
                break;
            case "ArrowDown":
                setActiveKeystroke({ key: 'ArrowDown', isReleased: true});
                moveVehicle(0, false);
                break;
            case "ArrowLeft":
                setActiveKeystroke({ key: 'ArrowLeft', isReleased: true});
                turnVehicle(-1, 0);
                break;
            case "ArrowRight":
                setActiveKeystroke({ key: 'ArrowRight', isReleased: true});
                turnVehicle(-1, 0);
                break;

            case "Escape":
                setActiveKeystroke({ key: 'Escape', isReleased: true});
                break;

            case "a":
                setActiveKeystroke({ key: 'a', isReleased: true});
                break;

            case "s":
                setActiveKeystroke({ key: 's', isReleased: true});
                break;

            case "d":
                setActiveKeystroke({ key: 'd', isReleased: true});
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

    const [ hasSocketConnection, setHasSocketConnection ] = useState(false);

    const checkSocketConnection = () => {
        if (socket.connected) {
            setHasSocketConnection(socket.connected);
            setStatus(statusList[1])
        } else {
            setHasSocketConnection(socket.connected);
            setStatus(statusList[0])
        }
    }

    const [ statusList ] = useState([
        {
            message: "Disconnected",
            type: 0
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

    const saveWaypoint = (data) => {
        return saveWaypointAPI(data)
            .then(res => {
                // setPhoneVerifyDetails({
                //     ...phoneVerifyDetails,
                //     phone: data.phone,
                //     token: res.token
                // })
            })
    }

    socket.on('connect', function(){
        console.log("socket server has been connected");
        setHasSocketConnection(true);
    });

    socket.on('disconnect', function(){
        console.log("socket server has been connected");
        setHasSocketConnection(false);
    });

    socket.on('vehicle position data', function(data){
        setVehicleStepsTaken(data.steps_taken);
    })

    const moveVehicle = (dir, shouldMove) => {
        emit('control vehicle', {dir: dir, shouldMove: shouldMove})
    }

    const turnVehicle = (dir, zone) => {
        emit('turn vehicle', {dir: dir, zone: zone});
    }

    const testSocketConnection = () => {        
        emit('acknowledge', {message: "Hello from client!"});
        
        socket.on( 'my response', function( data ) {
            console.log(data);
        })
    }

    return (
        <AppSettingsContext.Provider value={{
            apiRoutes,
            mobileOrientation , setMobileOrientation,
            closeServer, restartDevice, shutdownDevice, blinkLed,
            testSocketConnection,
            statusList, status, setStatus,
            activeKeystroke, setActiveKeystroke,
            handleKeyDown, handleKeyUp,
            hasSocketConnection, setHasSocketConnection, checkSocketConnection,
            moveVehicle, turnVehicle,
            saveWaypoint,
            vehicleStepsTaken, setVehicleStepsTaken
            }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;