import React, { Fragment, useState, useContext } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';
import StatusIndicator from './StatusIndicator';
import StepsTakenIndicator from './StepsTakenIndicator';

const StatusBar = () => {
    const { status }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            <nav className="status-bar">
                <div className="flex align-items-center justify-content-between">
                    <ul>
                        <li>
                            <div>
                                <StatusIndicator/>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <div>
                                <StepsTakenIndicator/>
                            </div>
                        </li>
                    </ul>
                </div>

            </nav>
        </Fragment>
    )
}

export default StatusBar;