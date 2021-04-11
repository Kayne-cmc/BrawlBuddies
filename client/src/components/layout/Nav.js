import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import AuthContext from '../../context/AuthContext';
import './Nav.css';


export default function Nav() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <div className="Nav">
            <ul>
                { 
                    (loggedIn && loggedIn.data === true) && (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/dashboard">Dashboard</Link></li>
                            <li><Logout /></li>         
                        </>               
                    )
                }
                {
                    (loggedIn && loggedIn.data === false) && (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )
                }
            </ul>
            <div className="line"></div>
        </div>
    )
}
