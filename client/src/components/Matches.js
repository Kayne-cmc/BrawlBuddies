import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Matches() {

    function Match(props) {
        return(
            <tr>
                <td></td>
            </tr>
        );
    }

    const [matches, setMatches] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:5000/data")
            .then(res => {
                setMatches(res);
            })
            .catch(err => console.log(err));
    }, [])

    function getMatches() {

    }

    return (
        <div className="Matches">
            <h1>Your Matches</h1>
            <table>
                <tr>
                    <thead>
                        <th>Name</th>
                        <th>Elo</th>
                        <th>Friend Code</th>
                    </thead>
                </tr>
            </table>
        </div>
    )
}
