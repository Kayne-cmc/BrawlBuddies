import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Matches.css';
import Table from 'react-bootstrap/Table';

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
            .get("http://localhost:5000/data/matches")
            .then(res => {
                setMatches(res.data);
                console.log (res.data);
            })
            .catch(err => console.log(err));
    }, [])

    return (
        <div className="Matches">
            <h1>Here are your matches in your region</h1>
            <Table stripped bordered hover variant="dark" className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Elo</th>
                        <th>Friend Code</th>
                    </tr>
                </thead>
                <tbody>
                    {matches && matches.map((match, index) => (
                        <Match match={match} key={index}></Match>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}
