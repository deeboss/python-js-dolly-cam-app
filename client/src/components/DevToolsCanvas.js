import React, { Fragment, useState, useContext, useEffect } from 'react';
import {Link} from "react-router-dom";

import '../assets/css/styles.scss';
import BackArrow from "../assets/img/icons/arrow-left.svg";

import { AppSettingsContext } from '../contexts/AppSettingsContext';
import { VehicleContext } from '../contexts/VehicleContext';
import Joystick from './Joystick';
import DeviceControls from './DeviceControls';
import StatusBar from './Status/StatusBar';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';
import WaypointsChart from './Waypoints/';
import Drawer from './Drawer';

const DevToolsCanvas = () => {
    const { user }  = useContext(AppSettingsContext);
    const { getWaypointData }  = useContext(VehicleContext);

    useEffect(() => {
        getWaypointData();
    }, [])

    return (
        <Fragment>
            <StatusBar/>
            <div className="wrapper">
                <div className="app-container">
                    <header>
                        <div><Link to="/"><img className="icon-s" alt="" src={BackArrow}/></Link></div>
                        <div><h3>Dev Tools</h3></div>
                        <div></div>
                    </header>
                    <div className="module"> 
                        <div className="row">
                            <div className="xs-12">
                                <WaypointsChart/>
                                <Joystick />
                            </div>
                        </div>
                        <div className="row">
                            <div className="xs-12">
                                <Drawer />
                            </div>
                        </div>
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