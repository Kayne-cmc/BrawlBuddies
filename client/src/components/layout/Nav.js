import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import AuthContext from '../../context/AuthContext';


export default function Nav() {

    const { loggedIn } = useContext(AuthContext);
    console.log(loggedIn);

    return (
        <div className="Nav">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Logout /></li>
            </ul>            
        </div>
    )
}
