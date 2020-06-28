import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { VehicleContext } from '../../contexts/VehicleContext';

const WaypointNode = ({id, name, steps_taken, onClick}) => {
    const { status }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <span className="waypoint-node" id={id} data-animation-delay={id}>
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