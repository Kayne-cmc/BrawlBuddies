import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import AuthContext from '../../context/AuthContext';
import './Nav.css';

export default function Nav() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <div className="Nav">
            <Link to="/" className="title" style={{textDecoration: "none", color: "white"}}><h2>BrawlBuddies</h2></Link>
            <ul>
                { 
                    (loggedIn && loggedIn.data) && (
                        <>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/matches">Matches</Link></li>
                            <li><Link to="/stats">Stats</Link></li>
                            <li><Logout /></li>         
                        </>               
                    )
                }
                {
                    (loggedIn && !loggedIn.data) && (
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
