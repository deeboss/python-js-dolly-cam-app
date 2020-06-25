import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const Joystick = () => {
    const { moveVehicle, stopVehicle, turnVehicle }  = useContext(AppSettingsContext);
    const [ stopVehicleHasFired, setStopVehicleHasFired ] = useState(false);
    const [ zoneForVerticalPosition, setZoneForVerticalPosition ] = useState(0);
    const [ zoneForHorizontalPosition, setZoneForHorizontalPosition ] = useState(0);

    const handleVerticalJoystickThresholding = (current) => {
        const thresholdArr =  [20, 40, 60, 80];

        let shouldTriggerSocket = false;
        let currentPosition = Math.floor(current);
        let currentZone = zoneForVerticalPosition;
        let newZoneCandidate = 0;

        if (currentPosition === 0) {
            newZoneCandidate = 0;
        } else if (currentPosition < thresholdArr[0]) {
            newZoneCandidate = 1;
        } else if (currentPosition < thresholdArr[1]) {
            newZoneCandidate = 2;
        } else if (currentPosition < thresholdArr[2]) {
            newZoneCandidate = 3;
        } else if (currentPosition < thresholdArr[3]) {
            newZoneCandidate = 4;
        } else {
            newZoneCandidate = 5;
        }

        if (newZoneCandidate !== currentZone) {
            setZoneForVerticalPosition(newZoneCandidate);
            shouldTriggerSocket = true;   
        }

        return shouldTriggerSocket;
    }

    const handleYJoystickMove = (evt, data) => {
        if (data.direction !== undefined) {
            const currentDistance = data.distance;
            setStopVehicleHasFired(false);
            if (data.direction.y === 'up') {
                let shouldFireSocketEvent = handleVerticalJoystickThresholding(currentDistance);
                console.log("starting");
                setTimeout(function(){
                    if (shouldFireSocketEvent && !stopVehicleHasFired) {
                        moveVehicle(true, true);
                    }
                }, 500);
            } else {
                let shouldFireSocketEvent = handleVerticalJoystickThresholding(currentDistance);
                console.log("starting");
                setTimeout(function(){
                    if (shouldFireSocketEvent && !stopVehicleHasFired) {
                        moveVehicle(false, true);
                    }
                }, 500);
            }
        }
    }

    const handleYJoystickEnd = (evt, data) => {
        setStopVehicleHasFired(true);
        stopVehicle(false);
    }

    const handleHorizontalJoystickThresholding = (current) => {
        const thresholdArr = [20, 40, 60, 80];

        let shouldTriggerSocket = false;
        let currentPosition = Math.floor(current);
        let currentZone = zoneForHorizontalPosition;
        let newZoneCandidate = 0;

        if (currentPosition === 0) {
            newZoneCandidate = 0;
        } else if (currentPosition < thresholdArr[0]) {
            newZoneCandidate = 1;
        } else if (currentPosition < thresholdArr[1]) {
            newZoneCandidate = 2;
        } else if (currentPosition < thresholdArr[2]) {
            newZoneCandidate = 3;
        } else if (currentPosition < thresholdArr[3]) {
            newZoneCandidate = 4;
        } else {
            newZoneCandidate = 5;
        }

        if (newZoneCandidate !== currentZone) {
            setZoneForHorizontalPosition(newZoneCandidate);
            shouldTriggerSocket = true;
            return [shouldTriggerSocket, newZoneCandidate];
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
        setZoneForHorizontalPosition(0);
        turnVehicle(-1, 0);
    }

    useEffect(() => {
        stopVehicle(false);
        return() => {

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