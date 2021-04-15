import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Auth.css';

export default function Login() {

    const [user, setUser] = useState({});
    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const onChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }

    const Login = (e) => {
        e.preventDefault();
        const userData = {
            email: user.email,
            password: user.password
        }

        axios.post("http://localhost:5000/auth/login", userData)
            .then(() => {
                history.push('/matches');
                getLoggedIn();
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="Login">
            <h1>Log in</h1>
            <Form onSubmit={Login}>
                <Form.Group>
                    <Form.Label htmlFor="email">Email</Form.Label>
                    <Form.Control
                        id="email"
                        type="text"
                        value={user.email}
                        placeholder="Email"
                        onChange={onChangeUser} />                    
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control
                        id="password"
                        type="password"
                        value={user.password}
                        placeholder="Password"
                        onChange={onChangeUser} />                    
                </Form.Group>

                <Button type="submit">Log in</Button>
            </Form>            
        </div>
    )
}
