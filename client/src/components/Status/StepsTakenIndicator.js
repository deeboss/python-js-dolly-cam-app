import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import Spinner from '../../assets/img/spinner-radial.svg';

import { VehicleContext } from '../../contexts/VehicleContext';

const StepsTakenIndicator = () => {
    const { moveVehicleCommandIssued, setMoveVehicleCommandIssued, vehicleStepsTaken }  = useContext(VehicleContext);
    const [ metersTraveled, setMetersTraveled ] = useState(0);

    const convertStepsToMeters = (steps) => {
        let converted = Math.round((10 * (steps / 23000)))/10;
        setMetersTraveled(converted);
    }

    useEffect(() => {
        convertStepsToMeters(vehicleStepsTaken);
    }, [vehicleStepsTaken])

    return (
        <Fragment>
            <span className="indicator-module">
                <h4>Steps Taken: 
                    { moveVehicleCommandIssued ? (
                        <img className="spinner" src={Spinner} alt=""/>
                    ) : (<span>{vehicleStepsTaken} (~{metersTraveled}m)</span>
                    )}
                </h4>
            </span>
        </Fragment>
    )
}

export default StepsTakenIndicator;