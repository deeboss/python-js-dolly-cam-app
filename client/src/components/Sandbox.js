import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const Sandbox = () => {
    const { blinkLed }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div className="module-container">
                <button onClick={blinkLed}>Make Pi Blink</button>
            </div>
        </Fragment>
    )
}

export default Sandbox;