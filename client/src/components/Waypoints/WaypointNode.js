import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';

const WaypointNode = () => {
    const { status }  = useContext(AppSettingsContext);

    return (
        <Fragment>
            Test
        </Fragment>
    )
}

export default WaypointNode;