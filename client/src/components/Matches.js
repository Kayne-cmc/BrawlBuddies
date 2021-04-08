import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Matches() {

    function Match(props) {
        return(
            <tr>
                <td>{props.match.name}</td>
                <td>{props.match.rating}</td>
                <td>{props.match.friendCode}</td>
            </tr>
        );
    }

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/data")
            .then(res => {
                setMatches(res.data);
                console.log (res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="Matches">
            <h1>Here are your matches in your region</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Elo</th>
                        <th>Friend Code</th>
                    </tr>
                </thead>
                <tbody>
                    {matches && matches.map((match, index) => (
                        <Match match={match}></Match>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
