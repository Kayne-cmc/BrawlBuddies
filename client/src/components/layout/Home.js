import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="Home">
            <Link to="login">
                <div className="card">
                    <div className="box">
                        <i className="fas fa-users" style={{"color": "pink"}}/>
                    </div>
                    <h3>Find new friends</h3>
                </div>
            </Link>
            <Link to="login">
                <div className="card">
                    <div className="box">
                        <i className="fas fa-chart-line" style={{"color": "red"}}/>
                    </div>
                    <h3>Check your stats</h3>
                </div>
            </Link>
            <Link to="login" style={{textDecoration: "none"}}>
                <div className="card">
                    <div className="box">
                        <i className="fas fa-users" style={{"color": "blue"}}/>
                    </div>
                    <h3>Check your friend's stats</h3>
                </div>
            </Link>
            
        </div>
    )
}
