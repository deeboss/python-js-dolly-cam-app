import React, { createContext, useState } from 'react';

export const MyAppContext = createContext();

const MyAppContextProvider = ({ children }) => {
    const [ isModalOpen, setIsModalOpen ] = useState(false);

    const [ user, setUser ] = useState({
        id: 0,
        name: '',
        password: ''
    })

    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    const [ loginStep, setLoginStep ] = useState(0);

    return (
        <MyAppContext.Provider value={{ isModalOpen, setIsModalOpen, user, setUser, isLoggedIn, setIsLoggedIn, loginStep, setLoginStep }}>
            { children }
        </MyAppContext.Provider>
    )
}

export default MyAppContextProvider;