import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import Joystick from './Joystick';

const ControllerCanvas = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div className="wrapper">     
                <div className="controller-canvas">
                    <Joystick />
                </div>
            </div>
        </Fragment>
    )
}

export default ControllerCanvas;