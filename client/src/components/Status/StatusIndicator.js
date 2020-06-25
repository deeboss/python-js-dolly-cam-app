import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';

const StatusIndicator = () => {
    const { status, setStatus, hasSocketConnection, setHasSocketConnection, checkSocketConnection }  = useContext(AppSettingsContext);

    useEffect(() => {
        checkSocketConnection();
        return() => {}
    }, [hasSocketConnection])
    return (
        <Fragment>
            <span className="status-indicator">
                <span data-status={status.type}></span>
                <h4>{status.message}</h4>
            </span>
        </Fragment>
    )
}

export default StatusIndicator;