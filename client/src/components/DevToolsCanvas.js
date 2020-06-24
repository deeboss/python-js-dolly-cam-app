import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import Joystick from './MovementJoystick';
import DeviceControls from './DeviceControls';
import StatusBar from './Status/StatusBar';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';

const DevToolsCanvas = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <StatusBar/>
            <div className="wrapper">
                <div className="app-container">
                    <div className="row">
                        <div className="xs-10"><Joystick /></div>
                        <div className="xs-2"><Joystick /></div>
                    </div>
                    <div className="row">
                        <div className="xs-12"><DeviceControls /></div>
                    </div>
                </div>
            </div>
            <KeyboardControlsCanvas />
        </Fragment>
    )
}

export default DevToolsCanvas;