import React, { createContext, useState, useEffect } from 'react';
// import { getAllCities as getAllCitiesAPI } from '../api/cities';
// import { getAllPhones as getAllPhonesAPI } from '../api/phones';

export const AppSettingsContext = createContext();

const AppSettingsContextProvider = ({ children }) => {
    const [apiRoutes, setApiRoutes] = useState({
        development: 'http://127.0.0.1:5000',
        production: 'http://0.0.0.0:5000',
    })

    return (
        <AppSettingsContext.Provider value={{ apiRoutes }}>
            {children}
        </AppSettingsContext.Provider>
    )
}

export default AppSettingsContextProvider;