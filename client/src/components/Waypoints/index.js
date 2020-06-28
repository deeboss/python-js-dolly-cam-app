import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { VehicleContext } from '../../contexts/VehicleContext';

import WaypointNode from './WaypointNode';

const WaypointsChart = () => {
    const { savedWaypoints }  = useContext(VehicleContext);

    const handleWaypointNodeClick = (e) => {
        console.log(savedWaypoints[e.target.id]);
    }
    
    useEffect(() => {
        Object.entries(savedWaypoints).map(([key, value]) => {console.log(value)});
    }, [savedWaypoints])

    const test = "hello";

    return (
        <Fragment>
            <div className="row">
                <div className="xs-12">
                    <div className="waypoint-chart">
                        <ul>
                            {Object.entries(savedWaypoints).map(([key, value]) => 
                                <li key={key}>
                                    {/* <span className="waypoint-node" id={key} onClick={handleWaypointNodeClick} data-animation-delay={key}>
                                        <span className="tooltip align-center">
                                            {value.name}
                                            <br />
                                            <small>Steps taken: {value.position.steps_taken}</small>
                                        </span>
                                    </span> */}
                                    <WaypointNode
                                        id={key}
                                        name={value.name}
                                        steps_taken={value.position.steps_taken}
                                        onClick={handleWaypointNodeClick}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default WaypointsChart;