import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { VehicleContext } from '../../contexts/VehicleContext';

const WaypointNode = ({id, name, steps_taken}) => {
    const { savedWaypoints }  = useContext(VehicleContext);

    const handleWaypointNodeClick = (e) => {
        console.log(savedWaypoints[e.target.id]);
    }

    return (
        <Fragment>
            <span className="waypoint-node" id={id} data-animation-delay={id} onClick={handleWaypointNodeClick}>
                <span className="tooltip align-center">
                    {name}
                    <br />
                    <small>Steps taken: {steps_taken}</small>
                </span>
            </span>
        </Fragment>
    )
}

export default WaypointNode;