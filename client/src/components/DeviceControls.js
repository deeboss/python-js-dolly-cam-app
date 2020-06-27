import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const DeviceControls = () => {
    const { blinkLed, testSocketConnection, shutdownServer, restartServer, closeServer }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div className="row">
                <div className="xs-12">
                    <button onClick={blinkLed}>Make Pi Blink</button>
                    <button onClick={testSocketConnection}>Test Socket Connection</button>
                    {/* <button onClick={shutdownServer}>Shutdown Server</button>
                    <button onClick={restartServer}>Restart Server</button>
                    <button onClick={closeServer}>Close Server</button> */}
                </div>
            </div>
        </Fragment>
    )
}

export default DeviceControls;