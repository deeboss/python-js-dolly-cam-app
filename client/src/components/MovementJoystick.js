import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const Joystick = () => {
    const { moveVehicle, turnVehicle }  = useContext(AppSettingsContext);
    const { moveVehicleCommandIssued, setMoveVehicleCommandIssued } = useContext(AppSettingsContext);
    const [ currentVerticalZone, setCurrentVerticalZone ] = useState(0);
    const [ currentHorizontalZone, setCurrentHorizontalZone ] = useState(0);

    const checkCurrentZone = (numOfZones, maxRange, currentJoystickPosition, currentZoneHook, updateCurrentZoneHook) => {
        // 1. Create thresholdArr based on desired number of zones, and the max range
        let zoneThresholds = [];
        for (let i = 0; i < numOfZones; i++) {
            zoneThresholds.push(Math.floor(maxRange/numOfZones)*i);
        }

        // console.log(zoneThresholds);

        // 2. Determine whether the current position of the joystick has left its zone
        let hasLeftZone = false;
        let currentPosition = Math.floor(currentJoystickPosition);
        let currentZone = currentZoneHook;
        let newZoneCandidate = 0;

        for (let i = 0; i < zoneThresholds.length; i++) {
            if (currentPosition === 0) {
                newZoneCandidate = 0;
                // console.log("we're at zone: " + newZoneCandidate);
                break;
            } else if (currentPosition <= zoneThresholds[i]) {
                // console.log(currentPosition);
                // console.log(zoneThresholds[i]);
                newZoneCandidate = i;
                // console.log("we're at zone: " + newZoneCandidate);
                break;
            } else if (currentPosition > zoneThresholds[zoneThresholds.length - 1]) {
                newZoneCandidate = zoneThresholds.length;
                // console.log("ELSE LOOP we're at zone: " + newZoneCandidate);
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
        }

        return [hasLeftZone, 0];
    }

    const handleYJoystickMove = (evt, data) => {
        if (data.direction !== undefined) {
            const currentDistance = data.distance;
            setMoveVehicleCommandIssued(true);
            if (data.direction.y === 'up') {
                const results = checkCurrentZone(3, 100, currentDistance, currentVerticalZone, setCurrentVerticalZone);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                if (shouldFireSocketEvent) {
                    moveVehicle(-1, true);
                }
            } else {
                const results = checkCurrentZone(3, 100, currentDistance, currentVerticalZone, setCurrentVerticalZone);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                if (shouldFireSocketEvent) {
                    moveVehicle(1, true);
                }
            }
        }
    }

    const handleXJoystickMove = (evt, data) => {
        if (data.direction !== undefined) {
            const currentDistance = data.distance;
            if (data.direction.x === 'left') {
                const results = checkCurrentZone(5, 100, currentDistance, currentHorizontalZone, setCurrentHorizontalZone);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                if (shouldFireSocketEvent) {
                    turnVehicle(-1, targetZone);
                }
            } else {
                const results = checkCurrentZone(5, 100, currentDistance, currentHorizontalZone, setCurrentHorizontalZone);
                const shouldFireSocketEvent = results[0];
                const targetZone = results[1];
                if (shouldFireSocketEvent) {
                    turnVehicle(1, targetZone);
                }
            }
        }
    }
    
    const handleYJoystickEnd = (evt, data) => {
        setCurrentVerticalZone(0);
        moveVehicle(0, false);
        setMoveVehicleCommandIssued(false);
    }

    const handleXJoystickEnd = (evt, data) => {
        setCurrentHorizontalZone(0);
        turnVehicle(-1, 0);
        setMoveVehicleCommandIssued(false);
    }

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