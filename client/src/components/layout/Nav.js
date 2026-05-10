import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout';
import AuthContext from '../../context/AuthContext';
import './Nav.css';

export default function Nav() {

    const { loggedIn } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="Nav" aria-label="Main navigation">
            <Link to="/" className="title" style={{textDecoration: "none", color: "white"}} aria-label="BrawlBuddies home"><h2>BrawlBuddies</h2></Link>
            <button
                className="hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
            >
                <i className={menuOpen ? "fas fa-times" : "fas fa-bars"} aria-hidden="true" />
            </button>
            <ul className={menuOpen ? "nav-open" : ""}>
                {
                    (loggedIn && loggedIn.data) && (
                        <>
                            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
                            <li><Link to="/matches" onClick={closeMenu}>Matches</Link></li>
                            <li><Link to="/stats" onClick={closeMenu}>Stats</Link></li>
                            <li><Logout /></li>
                        </>
                    )
                }
                {
                    (loggedIn && !loggedIn.data) && (
                        <>
                            <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
                            <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}
