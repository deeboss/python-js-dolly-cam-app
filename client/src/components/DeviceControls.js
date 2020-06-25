import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const DeviceControls = () => {
    const { blinkLed, testSocketConnection, shutdownServer, restartServer, closeServer }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <div className="module">
                <button onClick={blinkLed}>Make Pi Blink</button>
                <button onClick={testSocketConnection}>Test Socket Connection</button>
                <button onClick={shutdownServer}>Shutdown Server</button>
                <button onClick={restartServer}>Restart Server</button>
                <button onClick={closeServer}>Close Server</button>
            </div>
        </Fragment>
    )
}

export default DeviceControls;