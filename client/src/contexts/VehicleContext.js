import React, { createContext, useContext, useState, useEffect } from 'react';

import { saveWaypoint as saveWaypointAPI, deleteWaypoint as deleteWaypointAPI, goToWaypoint as goToWaypointAPI } from '../actions/movementActions';
import { socket, emitSocketEvent as emit } from '../actions/socketActions';
import { getObjectSize } from '../utils/general';

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

            case "-":
                setActiveKeystroke({ key: '-', isReleased: false});
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
            
            case "+":
                setActiveKeystroke({ key: '+', isReleased: false});
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
                saveWaypoint({"id": "1", "name": "Waypoint 1", "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: 'z', isReleased: true});
                break;

            case "x":
                saveWaypoint({"id": "2", "name": "Waypoint 2", "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: 'x', isReleased: true});
                break;

            case "c":
                saveWaypoint({"id": "3", "name": "Waypoint 3", "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: 'c', isReleased: true});
                break;

            case "+":
                const nextIndex = getObjectSize(savedWaypoints) + 1;
                saveWaypoint({"id": nextIndex.toString(), "name": "Waypoint " + nextIndex.toString(), "position": {"steps_taken": vehicleStepsTaken}});
                setActiveKeystroke({ key: '+', isReleased: true});
                break;

            case "-":
                const currentIndex = getObjectSize(savedWaypoints);
                deleteWaypoint({"id": currentIndex.toString()});
                setActiveKeystroke({ key: '-', isReleased: true});
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

    const deleteWaypoint = (data) => {
        if (getObjectSize(savedWaypoints) !== 0) {
            async function sendData() {
                try {
                    const result = await deleteWaypointAPI(data);
                    setSavedWaypoints(result);
                } catch(error) {
                    console.log(error);
                }
            }
            sendData();
        } else {
            console.log("No waypoints to delete! Save one first.")
        }
    }


    const getWaypointData = () => {
        emit('get waypoint data', {});

        socket.on('send waypoint data', function(data) {
            setSavedWaypoints(data);
            console.log("Waypoint data retrieved:\n")
            console.log(data)
        })
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
        let numOfWaypoints = getObjectSize(savedWaypoints);
        
        // Get the size of an object
        // console.log(savedWaypoints);
        console.log(numOfWaypoints);
        
        return () => {}
    }, [savedWaypoints])

    return (
        <VehicleContext.Provider value={{
            handleKeyDown, handleKeyUp,
            moveVehicleCommandIssued, setMoveVehicleCommandIssued,
            moveVehicle, turnVehicle,
            saveWaypoint, deleteWaypoint, getWaypointData,
            savedWaypoints, setSavedWaypoints,
            vehicleStepsTaken, setVehicleStepsTaken
            }}>
            {children}
        </VehicleContext.Provider>
    )
}

export default VehicleContextProvider;