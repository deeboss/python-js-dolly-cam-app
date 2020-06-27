import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { VehicleContext } from '../../contexts/VehicleContext';

const StepsTakenIndicator = () => {
    const { vehicleStepsTaken }  = useContext(VehicleContext);
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
                <h4>Steps Taken: {vehicleStepsTaken} (~{metersTraveled}m)</h4>
            </span>
        </Fragment>
    )
}

export default StepsTakenIndicator;