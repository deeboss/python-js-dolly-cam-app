import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { VehicleContext } from '../contexts/VehicleContext';
import Joystick from './Joystick';
import DeviceControls from './DeviceControls';
import StatusBar from './Status/StatusBar';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';
import WaypointsChart from './Waypoints/';

const DevToolsCanvas = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <StatusBar/>
            <div className="wrapper">
                <div className="app-container">
                    <div className="module"> 
                        <WaypointsChart/>
                        <Joystick />
                    </div>
                </div>
            </div>
            <div className="floating-controller">
                <DeviceControls />
                <KeyboardControlsCanvas />
            </div>
        </Fragment>
    )
}

export default DevToolsCanvas;