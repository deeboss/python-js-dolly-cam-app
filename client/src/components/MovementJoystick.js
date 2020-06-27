import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const Joystick = () => {
    const { moveVehicle, stopVehicle, turnVehicle }  = useContext(AppSettingsContext);
    const [ stopVehicleHasFired, setStopVehicleHasFired ] = useState(false);
    const [ currentVerticalZone, setCurrentVerticalZone ] = useState(0);
    const [ currentHorizontalZone, setCurrentHorizontalZone ] = useState(0);

    const checkCurrentZone = (numOfZones, maxRange, currentJoystickPosition, currentZoneHook, updateCurrentZoneHook) => {
        // 1. Create thresholdArr based on desired number of zones, and the max range
        let zoneThresholds = [];
        for (let i = 0; i < numOfZones; i++) {
            zoneThresholds.push(Math.floor(maxRange/numOfZones)*i);
        }

        // 2. Determine whether the current position of the joystick has left its zone
        let hasLeftZone = false;
        let currentPosition = Math.floor(currentJoystickPosition);
        let currentZone = currentZoneHook;
        let newZoneCandidate = 0;

        for (let i = 0; i < zoneThresholds.length; i++) {
            if (currentPosition < zoneThresholds[i + 1]) {
                // console.log(currentPosition);
                // console.log(zoneThresholds[i + 1]);
                newZoneCandidate = i + 1;
                // console.log("we're at zone: " + newZoneCandidate);
                break;
            }
        }

        // 3. If the current position exceeds its last known zone,
        //    update it and send boolean signal to fire an event
        if (newZoneCandidate !== currentZone) {
            // console.log("we've left the zone. should update now from " + currentZone + " to " + newZoneCandidate);
            hasLeftZone = true;
            updateCurrentZoneHook(newZoneCandidate);
            currentZone = newZoneCandidate;
            return [hasLeftZone, newZoneCandidate];
        } else {
            // console.log("\n\n\n\ndo not fire!\n\n\n\n")
            return [hasLeftZone, 0];
        }
    }

    const handleVerticalJoystickThresholding = (current) => {
        const thresholdArr =  [33, 66];

        let shouldTriggerSocket = false;
        let currentPosition = Math.floor(current);
        let currentZone = currentVerticalZone;
        let newZoneCandidate = 0;

        if (currentPosition === 0) {
            newZoneCandidate = 0;
        } else if (currentPosition < thresholdArr[0]) {
            newZoneCandidate = 1;
        } else if (currentPosition < thresholdArr[1]) {
            newZoneCandidate = 2;
        } else {
            newZoneCandidate = 3;
        }

        if (newZoneCandidate !== currentZone) {
            setCurrentVerticalZone(newZoneCandidate);
            shouldTriggerSocket = true;   
        }

        return shouldTriggerSocket;
    }

    const handleYJoystickMove = (evt, data) => {
        if (data.direction !== undefined) {
            const currentDistance = data.distance;
            setStopVehicleHasFired(false);
            if (data.direction.y === 'up') {
                const results = checkCurrentZone(3, 100, currentDistance, currentVerticalZone, setCurrentVerticalZone);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                // setTimeout(function(){
                    if (shouldFireSocketEvent && !stopVehicleHasFired) {
                        // console.log("==============\n\n\n\n");
                        // console.log("fire!");
                        // console.log("==============\n\n\n\n");
                        moveVehicle(true, true);
                    }
                // }, 500);
            } else {
                const results = checkCurrentZone(3, 100, currentDistance, currentVerticalZone, setCurrentVerticalZone);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                // setTimeout(function(){
                    if (shouldFireSocketEvent && !stopVehicleHasFired) {
                        // console.log("==============\n\n\n\n");
                        // console.log("fire!");
                        // console.log("==============\n\n\n\n");
                        moveVehicle(false, true);
                    }
                // }, 500);
            }
        }
    }

    const handleYJoystickEnd = (evt, data) => {
        setStopVehicleHasFired(true);
        // stopVehicle(false);
    }

    const handleHorizontalJoystickThresholding = (current) => {
        const thresholdArr = [20, 40, 60, 80];

        let shouldTriggerSocket = false;
        let currentPosition = Math.floor(current);
        let currentZone = currentHorizontalZone;
        let newZoneCandidate = 0;

        if (currentPosition === 0) {
            newZoneCandidate = 0;
            console.log("we're at zone " + newZoneCandidate);
        } else if (currentPosition < thresholdArr[0]) {
            newZoneCandidate = 1;
            console.log("we're at zone " + newZoneCandidate);
        } else if (currentPosition < thresholdArr[1]) {
            newZoneCandidate = 2;
            console.log("we're at zone " + newZoneCandidate);
        } else if (currentPosition < thresholdArr[2]) {
            newZoneCandidate = 3;
            console.log("we're at zone " + newZoneCandidate);
        } else if (currentPosition < thresholdArr[3]) {
            newZoneCandidate = 4;
            console.log("we're at zone " + newZoneCandidate);
        } else {
            newZoneCandidate = 5;
            console.log("we're at zone " + newZoneCandidate);
        }

        if (newZoneCandidate !== currentZone) {
            setCurrentHorizontalZone(newZoneCandidate);
            console.log("\n\n\n\n\n\n\n\nfire\n\n\n\n\n\n\n\n")
            shouldTriggerSocket = true;
            return [shouldTriggerSocket, newZoneCandidate];
        } else {
            console.log("do not fire")
        }

        return [shouldTriggerSocket, 0];
    }

    const handleXJoystickMove = (evt, data) => {
        if (data.direction !== undefined) {
            const currentDistance = data.distance;
            if (data.direction.x === 'left') {
                const results = handleHorizontalJoystickThresholding(currentDistance);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                setTimeout(function(){
                    if (shouldFireSocketEvent) {
                        turnVehicle(-1, targetZone);
                    }
                }, 500);
            } else {
                const results = handleHorizontalJoystickThresholding(currentDistance);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                setTimeout(function(){
                    if (shouldFireSocketEvent) {
                        turnVehicle(1, targetZone);
                    }
                }, 500);
            }
        }
    }

    const handleXJoystickEnd = (evt, data) => {
        turnVehicle(-1, 0);
    }

    useEffect(() => {
        console.log("Component Mounted");
        setCurrentVerticalZone(0);
        setCurrentHorizontalZone(0);
        return() => {
            stopVehicle(false);
        }
    }, [stopVehicleHasFired]);

    return (
        <Fragment>
            <div className="module">
                <div className="row">
                    <div className="xs-12 md-6">
                        <h4>Movement</h4>
                        <ReactNipple
                            // supports all nipplejs options
                            // see https://github.com/yoannmoinet/nipplejs#options
                            options={{ mode: 'static', position: { top: '50%', left: '50%' }, size: 200, lockY: true}}
                            // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                            style={{
                                width: 250,
                                height: 250
                                // if you pass position: 'relative', you don't need to import the stylesheet
                            }}
                            // all events supported by nipplejs are available as callbacks
                            // see https://github.com/yoannmoinet/nipplejs#start
                            onMove={(evt, data) => handleYJoystickMove(evt, data)}
                            onEnd={(evt, data) => handleYJoystickEnd(evt, data)}

                        />
                    </div>
                    <div className="xs-12 md-6">
                        <h4>Turning</h4>
                        <ReactNipple
                            // supports all nipplejs options
                            // see https://github.com/yoannmoinet/nipplejs#options
                            options={{ mode: 'static', position: { top: '50%', left: '50%' },  size: 200, lockX: true}}
                            // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                            style={{
                                width: 250,
                                height: 250
                                // if you pass position: 'relative', you don't need to import the stylesheet
                            }}
                            // all events supported by nipplejs are available as callbacks
                            // see https://github.com/yoannmoinet/nipplejs#start
                            onMove={(evt, data) => handleXJoystickMove(evt, data)}
                            onEnd={(evt, data) => handleXJoystickEnd(evt, data)}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Joystick;