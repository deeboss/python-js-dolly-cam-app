import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const StatusBar = () => {
    const { user }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <nav className="status-bar">
                hello
            </nav>
        </Fragment>
    )
}

export default StatusBar;