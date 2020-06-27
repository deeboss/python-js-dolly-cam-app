import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';

const StepsTakenIndicator = () => {
    const { vehicleStepsTaken }  = useContext(AppSettingsContext);
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
                <h4>Steps Taken: {vehicleStepsTaken} (~{metersTraveled} meters)</h4>
            </span>
        </Fragment>
    )
}

export default StepsTakenIndicator;