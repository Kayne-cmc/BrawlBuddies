import React from 'react';
import './Home.css'

export default function Home() {
    return (
        <div className="Home">
            <div className="card">
                <div className="box">
                    <i className="fas fa-users" style={{"color": "pink"}}/>
                </div>
                <h3>Find new friends</h3>
            </div>
            <div className="card">
                <div className="box">
                    <i className="fas fa-chart-line" style={{"color": "red"}}/>
                </div>
                <h3>Check your stats</h3>
            </div>
            <div className="card">
                <div className="box">
                    <i className="fas fa-users" style={{"color": "blue"}}/>
                </div>
                <h3>Check your friend's stats</h3>
            </div>
        </div>
    )
}
