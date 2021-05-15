import React, { createContext, useState, useEffect } from 'react';
import DataService from '../services/service';

const AuthContext = createContext();

function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await DataService.loggedIn();
        setLoggedIn(loggedInRes);
    };

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, getLoggedIn }}>
            { props.children }
        </AuthContext.Provider>
    )
}

export { AuthContextProvider };
export default AuthContext;