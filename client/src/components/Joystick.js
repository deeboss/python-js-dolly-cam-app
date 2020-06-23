import React, { Fragment, useState, useContext } from 'react';
import ReactNipple from 'react-nipple';
import 'react-nipple/lib/styles.css';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const Joystick = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div>
                <h2>Test</h2>
                <ReactNipple
                    // supports all nipplejs options
                    // see https://github.com/yoannmoinet/nipplejs#options
                    options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
                    // any unknown props will be passed to the container element, e.g. 'title', 'style' etc
                    style={{
                        outline: '1px dashed red',
                        width: 150,
                        height: 150
                        // if you pass position: 'relative', you don't need to import the stylesheet
                    }}
                    // all events supported by nipplejs are available as callbacks
                    // see https://github.com/yoannmoinet/nipplejs#start
                    onMove={(evt, data) => console.log(evt, data)}
                />
            </div>
        </Fragment>
    )
}

export default Joystick;