import React, { Fragment, useState, useContext, useEffect } from 'react';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const Joystick = () => {
    const { moveVehicle, stopVehicle }  = useContext(AppSettingsContext);

    const handleYJoystickMove = (evt, data) => {
        // console.log(evt, data);
        if (data.direction !== undefined) {
            // console.log(data.direction.y);
            if (data.direction.y === 'up') {
                console.log("go up!")
                moveVehicle(true, true);
            } else {
                console.log("go down!")
                moveVehicle(false, true);
            }
        }
    }

    const handleYJoystickEnd = (evt, data) => {
        console.log("stop!")
        stopVehicle(false);
    }

    const handleXJoystickMove = (evt, data) => {
        // console.log(evt, data);
        if (data.direction !== undefined) {
            console.log(data.direction.x);
        }
    }

    useEffect(() => {
        return() => {

        }
    }, []);

    return (
        <Fragment>
            <div className="module">
                <div className="row">
                    <div className="xs-12 md-6">
                        <h4>Movement</h4>
                        <ReactNipple
                            // supports all nipplejs options
                            // see https://github.com/yoannmoinet/nipplejs#options
                            options={{ mode: 'static', position: { top: '50%', left: '50%' }, lockY: true}}
                            // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                            style={{
                                width: 150,
                                height: 150
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
                            options={{ mode: 'static', position: { top: '50%', left: '50%' }, lockX: true}}
                            // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                            style={{
                                width: 150,
                                height: 150
                                // if you pass position: 'relative', you don't need to import the stylesheet
                            }}
                            // all events supported by nipplejs are available as callbacks
                            // see https://github.com/yoannmoinet/nipplejs#start
                            onMove={(evt, data) => handleXJoystickMove(evt, data)}
                        />
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Joystick;