import React, { useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

export default function Logout() {

    const { getLoggedIn } = useContext(AuthContext);

    async function logout() {
        await axios.get("http://localhost:5000/auth/logout");
        getLoggedIn();
    }

    return (
        <button onClick={logout}>Log out</button>
    )
}
