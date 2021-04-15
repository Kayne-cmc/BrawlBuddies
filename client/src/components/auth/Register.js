import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom'
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/AuthContext';
import './Auth.css';

export default function Register(props) {

    const [newUser, setNewUser] = useState({});
    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const onChangeNewUser = (e) => {
        setNewUser({
            ...newUser,
            [e.target.id]: e.target.value
        });
    }

    const Register = (e) => {
        e.preventDefault();

        const { email, name, steamId, friendCode, password, passwordCheck} = newUser;

        const user = {
            email: email,
            name: name,
            steamId: steamId,
            friendCode: friendCode,
            password: password,
            passwordCheck: passwordCheck,
        }
        
        axios.post("http://localhost:5000/auth/register", user)
            .then(() => {
                getLoggedIn();
                history.push("/matches");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="Register">
            <h1>Create an account</h1>
            <Form onSubmit={Register}>
                <Form.Group>
                    <Form.Label htmlFor="name">Name</Form.Label>
                    <Form.Control
                        id="name"
                        type="text"
                        value={newUser.name}
                        placeholder="What's your name?"
                        onChange={onChangeNewUser} />
                </Form.Group>                    
                <Form.Group>
                    <Form.Label htmlFor="steamId">Steam ID</Form.Label>
                    <Link to="help"><i className="fas fa-question-circle" /></Link>
                    <Form.Control
                        id="steamId"
                        type="text"
                        value={newUser.steamId}
                        placeholder="Steam ID"
                        onChange={onChangeNewUser} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="friendCode">Friend Code</Form.Label>
                    <Link to="/help"><i className="fas fa-question-circle" /></Link>
                    <Form.Control
                        id="friendCode"
                        type="text"
                        value={newUser.friendCode}
                        placeholder="Friend Code"
                        onChange={onChangeNewUser} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        id="email"
                        type="email"
                        value={newUser.email}
                        placeholder="Enter Email"
                        onChange={onChangeNewUser} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        value={newUser.password}
                        placeholder="Choose a Password"
                        onChange={onChangeNewUser} />
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="passwordCheck">Verify your Password</Form.Label>
                    <Form.Control
                        id="passwordCheck"
                        type="password"
                        value={newUser.passwordCheck}
                        placeholder="Re-type your password"
                        onChange={onChangeNewUser} />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>            
        </div>
    )
}
