import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const DevCanvas = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <h2>Test</h2>
        </Fragment>
    )
}

export default DevCanvas;