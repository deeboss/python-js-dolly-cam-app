import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';
import Joystick from './MovementJoystick';
import Sandbox from './Sandbox';

const ControllerCanvas = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div className="wrapper">     
                <div className="controller-canvas">
                    <div className="row">
                        <div className="xs-10"><Joystick /></div>
                        <div className="xs-2"><Joystick /></div>
                    </div>
                    <div className="row">
                        <div className="xs-12"><Sandbox /></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ControllerCanvas;