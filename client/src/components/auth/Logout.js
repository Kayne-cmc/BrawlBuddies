import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

export default function Logout(props) {

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory()

    async function logout() {
        await axios.get("http://localhost:5000/auth/logout");
        await getLoggedIn();
        history.push("/");
    }

    return (
        <div className="Logout">
            <button onClick={logout}>Log out</button>
        </div>
    )
}
