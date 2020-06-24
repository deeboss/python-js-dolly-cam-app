import React, { Fragment, useState, useContext } from 'react';
import '../assets/css/styles.scss';
import { AppSettingsContext } from '../contexts/AppSettingsContext';

const StatusBar = () => {
    const { status }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <nav className="status-bar">
                <ul>
                    <li>
                        <div>
                            <span>{status.message}</span>
                        </div>
                    </li>
                </ul>
            </nav>
        </Fragment>
    )
}

export default StatusBar;