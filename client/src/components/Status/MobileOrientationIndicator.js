import React, { Fragment, useState, useContext, useEffect } from 'react';
import '../../assets/css/styles.scss';
import { AppSettingsContext } from '../../contexts/AppSettingsContext';

const MobileOrientationIndicator = () => {
    const { mobileOrientation, setMobileOrientation }  = useContext(AppSettingsContext);

    const checkMobileOrientation = () => {
        document.addEventListener('orientationchange', function(e){
            let isUpright = (document.orientation == 'portrait');
            if (document.orientation !== 0) {
                setMobileOrientation(1);
                alert("portrait");
            } else {
                setMobileOrientation(0);
                alert("landscape");
            }
        });
    }
    checkMobileOrientation();
    
    
    useEffect(() => {
        return() => {}
    }, [mobileOrientation])

    return (
        <Fragment>
            <span className="indicator-module">
                <h4>{mobileOrientation}</h4>
            </span>
        </Fragment>
    )
}

export default MobileOrientationIndicator;