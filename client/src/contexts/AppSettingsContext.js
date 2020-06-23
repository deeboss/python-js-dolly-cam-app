import React, { createContext, useState, useEffect } from 'react';
import { makePiBlink as makePiBlinkAPI } from '../api/deviceControls';

export const AppSettingsContext = createContext();

const AppSettingsContextProvider = ({ children }) => {
    const [apiRoutes, setApiRoutes] = useState({
        development: 'http://127.0.0.1:5000',
        production: 'http://0.0.0.0:5000',
    });

    const blinkLed = () => {
        async function fetchData() {
            try {
                const result = await makePiBlinkAPI();
                console.log(result);
            } catch(error) {
                console.log(error);
            }
        }

        fetchData();
    }

    return (
        <AppSettingsContext.Provider value={{ apiRoutes, blinkLed }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;