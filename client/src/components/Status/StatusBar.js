import React, { Fragment, useState, useContext } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import StatusIndicator from './StatusIndicator';

const StatusBar = () => {
    const { status }  = useContext(AppSettingsContext);
    console.log(status);
    return (
        <Fragment>
            <nav className="status-bar">
                <ul>
                    <li>
                        <div>
                            <StatusIndicator/>
                        </div>
                    </li>
                </ul>
            </nav>
        </Fragment>
    )
}

export default StatusBar;