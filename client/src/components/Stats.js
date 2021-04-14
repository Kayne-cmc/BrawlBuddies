import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Stats() {

    const [stats, setStats] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:5000/data/stats")
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="Stats">
            <p>Stats</p>
        </div>
    )
}
