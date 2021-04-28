import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Stats() {

    const [stats, setStats] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:5000/data/stats")
            .then(res => {
                setStats(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="Stats">
            <p>Stats</p>
            {
                stats && (
                    <table>
                        <tr>
                            <td>Rating</td>
                            <td>{stats.rating}</td>
                        </tr>
                        <tr>
                            <td>Highest Rating</td>
                            <td>{stats.peak_rating}</td>
                        </tr>
                        <tr>
                            <td>Tier</td>
                            <td>{stats.tier}</td>
                        </tr>
                        <tr>
                            <td>Global Rank</td>
                            <td>{stats.global_rank}</td>
                        </tr>
                        <tr>
                            <td>Region Rank</td>
                            <td>{stats.region_rank}</td>
                        </tr>
                    </table>
                )
            }
        </div>
    )
}
