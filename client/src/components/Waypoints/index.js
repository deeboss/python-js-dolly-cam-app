import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import { VehicleContext } from '../../contexts/VehicleContext';

const WaypointsChart = () => {
    const { status }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div className="row">
                <div className="xs-12">
                    <div className="waypoint-chart">
                        <ul>
                            <li></li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default WaypointsChart;