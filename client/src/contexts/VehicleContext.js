import React, { createContext, useContext, useState, useEffect } from 'react';

import { saveOneWaypoint as saveWaypointAPI, deleteOneWaypoint as deleteWaypointAPI, deleteAllWaypoints as deleteAllWaypointsAPI, goToWaypoint as goToWaypointAPI } from '../actions/movementActions';
import { socket, emitSocketEvent as emit } from '../actions/socketActions';
import { getObjectSize } from '../utils/general';

import { AppSettingsContext } from '../contexts/AppSettingsContext';

export const VehicleContext = createContext();

const VehicleContextProvider = ({ children }) => {
    const { status, setStatus, statusList, activeKeystroke, setActiveKeystroke } = useContext(AppSettingsContext);
    const [ moveVehicleCommandIssued, setMoveVehicleCommandIssued ] = useState(false);

    const [ vehicleStepsTaken, setVehicleStepsTaken ] = useState(0);

    const [ savedWaypoints, setSavedWaypoints ] = useState({});

    const [ selectedWaypoint, setSelectedWaypoint ] = useState({});

    const handleKeyDown = (e) => {
        if (!activeKeystroke.isReleased) {
            return
        }
        switch(e.key) {
            case "ArrowUp":
                setActiveKeystroke({ key: 'ArrowUp', isReleased: false});
                setMoveVehicleCommandIssued(true);
                moveVehicle(-1, true);
                break;
            case "ArrowDown":
                setActiveKeystroke({ key: 'ArrowDown', isReleased: false});
                setMoveVehicleCommandIssued(true);
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

            case "-":
                setActiveKeystroke({ key: '-', isReleased: false});
                break;

            case "Delete":
                setActiveKeystroke({ key: 'Delete', isReleased: false});
                break;
                
            default:
                break;
        }
    }

    const handleKeyUp = (e) => {
        switch(e.key) {
            case "ArrowUp":
                setActiveKeystroke({ key: 'ArrowUp', isReleased: true});
                setMoveVehicleCommandIssued(false);
                moveVehicle(0, false);
                break;
            case "ArrowDown":
                setActiveKeystroke({ key: 'ArrowDown', isReleased: true});
                setMoveVehicleCommandIssued(false);
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

            case "Delete":
                deleteAllWaypoints();
                setActiveKeystroke({ key: 'Delete', isReleased: true});
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
                    if (selectedWaypoint.id === data.id) {
                        setSelectedWaypoint({});
                    }
                } catch(error) {
                    console.log(error);
                }
            }
            sendData();
        } else {
            console.log("No waypoints to delete! Save one first.")
        }
    }

    const deleteAllWaypoints = () => {
        if (getObjectSize(savedWaypoints) !== 0) {
            async function sendData() {
                try {
                    const result = await deleteAllWaypointsAPI();
                    setSavedWaypoints(result);
                    setSelectedWaypoint({});
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
        })
    }

    const goToWaypoint = (data) => {
        setStatus({message: "Going to waypoint " + data.id, type: 1});

        async function sendData() {
            try {
                const result = await goToWaypointAPI(data);
                // setSavedWaypoints(result);
                setStatus(statusList[2]);
            } catch(error) {
                console.log(error);
            }
        }
        sendData();
    }

    const moveVehicle = (dir, shouldMove) => {
        emit('control vehicle', {dir: dir, shouldMove: shouldMove});
        
        const direction = (dir === -1) ? 'forwards' : 'backwards';

        if (shouldMove) {
            setStatus({message: "Moving " + direction, type: 1});
        } else {
            setStatus(statusList[2]);
        }
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

        
        return () => {}
    }, [savedWaypoints])

    return (
        <VehicleContext.Provider value={{
            handleKeyDown, handleKeyUp,
            moveVehicleCommandIssued, setMoveVehicleCommandIssued,
            moveVehicle, turnVehicle,
            saveWaypoint, deleteWaypoint, getWaypointData,
            savedWaypoints, setSavedWaypoints,
            selectedWaypoint, setSelectedWaypoint,
            vehicleStepsTaken, setVehicleStepsTaken
            }}>
            {children}
        </VehicleContext.Provider>
    )
}

export default VehicleContextProvider;