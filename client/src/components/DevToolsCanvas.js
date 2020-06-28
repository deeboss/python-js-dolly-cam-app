import React, { Fragment, useState, useContext, useEffect } from 'react';
import {Link} from "react-router-dom";

import '../assets/css/styles.scss';
import BackArrow from "../assets/img/icons/arrow-left.svg";

import { VehicleContext } from '../contexts/VehicleContext';
import Joystick from './Joystick';
import StatusBar from './Status/StatusBar';
import KeyboardControlsCanvas from './KeyboardControlsCanvas';
import WaypointsChart from './Waypoints/';
import Drawer from './Drawer';

const DevToolsCanvas = () => {
    const { savedWaypoints, getWaypointData }  = useContext(VehicleContext);

    useEffect(() => {
        getWaypointData();
        return () => {
        }
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
                    <div className="flex nowrap">    
                        <div className="module"> 
                            <WaypointsChart/>
                            <Joystick />
                        </div>
                        <Drawer />
                    </div>
                </div>
            </div>
            <div className="floating-controller">
                <KeyboardControlsCanvas />
            </div>
        </Fragment>
    )
}

export default DevToolsCanvas;