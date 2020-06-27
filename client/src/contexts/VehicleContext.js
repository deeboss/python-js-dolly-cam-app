import React, { createContext, useContext, useState, useEffect } from 'react';

import { saveWaypoint as saveWaypointAPI, goToWaypoint as goToWaypointAPI } from '../actions/movementActions';
import { socket, emitSocketEvent as emit } from '../actions/socketActions';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

export const VehicleContext = createContext();

const VehicleContextProvider = ({ children }) => {
    const { activeKeystroke, setActiveKeystroke } = useContext(AppSettingsContext);
    const [ moveVehicleCommandIssued, setMoveVehicleCommandIssued ] = useState(false);

    const [ vehicleStepsTaken, setVehicleStepsTaken ] = useState(0);

    const [ savedWaypoints, setSavedWaypoints ] = useState({});

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
                goToWaypoint(savedWaypoints['1']);
                break;

            case "s":
                setActiveKeystroke({ key: 's', isReleased: true});
                goToWaypoint(savedWaypoints['2']);
                break;

            case "d":
                setActiveKeystroke({ key: 'd', isReleased: true});
                goToWaypoint(savedWaypoints['3']);
                break;

            case "z":
                saveWaypoint({"id": "1", "name": "Waypoint One", "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: 'z', isReleased: true});
                break;

            case "x":
                saveWaypoint({"id": "2", "name": "Waypoint Two", "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: 'x', isReleased: true});
                break;

            case "c":
                saveWaypoint({"id": "3", "name": "Waypoint Three", "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: 'c', isReleased: true});
                break;

            case "r":
                setActiveKeystroke({ key: 'r', isReleased: true});
                break;
                
            default:
                break;
        }
    }

    const saveWaypoint = (data) => {
        async function sendData() {
            try {
                const result = await saveWaypointAPI(data);
                setSavedWaypoints(result);
            } catch(error) {
                console.log(error);
            }
        }
        sendData();
    }

    const goToWaypoint = (data) => {
        async function sendData() {
            try {
                const result = await goToWaypointAPI(data);
                // setSavedWaypoints(result);
            } catch(error) {
                console.log(error);
            }
        }
        sendData();
    }

    const moveVehicle = (dir, shouldMove) => {
        emit('control vehicle', {dir: dir, shouldMove: shouldMove})
    }

    const turnVehicle = (dir, zone) => {
        emit('turn vehicle', {dir: dir, zone: zone});
    }

    useEffect(() => {
        if (moveVehicleCommandIssued === false) {
            socket.on('vehicle position data', function(data){
                setVehicleStepsTaken(data.steps_taken);
            })
        }

        return () => {
        }
    }, [moveVehicleCommandIssued])

    useEffect(() => {
        Object.size = function(obj) {
            let size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };
        
        // Get the size of an object
        let numOfWaypoints = Object.size(savedWaypoints);
        // console.log(savedWaypoints);
        // console.log(numOfWaypoints);
        
        return () => {}
    }, [savedWaypoints])

    return (
        <VehicleContext.Provider value={{
            handleKeyDown, handleKeyUp,
            moveVehicleCommandIssued, setMoveVehicleCommandIssued,
            moveVehicle, turnVehicle,
            saveWaypoint,
            savedWaypoints, setSavedWaypoints,
            vehicleStepsTaken, setVehicleStepsTaken
            }}>
            {children}
        </VehicleContext.Provider>
    )
}

export default VehicleContextProvider;