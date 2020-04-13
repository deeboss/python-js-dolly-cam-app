import React, { Fragment, useState, useContext, useEffect } from 'react';

import { MyAppContext } from '../contexts/MyAppContext';

const MyFirstComponent = () => {
    const { user }  = useContext(MyAppContext);

    return (
        <Fragment>
            <h1>Hello world</h1>
        </Fragment>
    )
}

export default MyFirstComponent;