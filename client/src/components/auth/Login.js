import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import './Auth.css';

import { TextField, Button, makeStyles } from '@material-ui/core';

export default function Login() {

    const [user, setUser] = useState({});
    const [message, setMessage] = useState('');
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
            .catch((err) => {
                setMessage(err.response.data.user);
                console.error(err.response);
            });
    }

    const useStyles = makeStyles(() => ({
        input: {
            color: 'red',
            border: 'red',
        }
    }));

    function StyledInput() {
        const classes = useStyles();
        return(<TextField className={classes.input}
            color="primary"
            id="email"
            type="text"
            margin="normal"
            label="Email"
            variant="outlined"
            fullWidth
            required
            onChange={onChangeUser}
        />);
    }

    return (
        <div className="Login">
            <h1>Log in</h1> 
            <form onSubmit={Login}>
                {/* <StyledInput /> */}
                <TextField className={classes.input}
                    color="primary"
                    id="email"
                    type="text"
                    margin="normal"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={onChangeUser}
                />
                <TextField
                    id="password"
                    type="password"
                    margin="normal"
                    className="input"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    required
                    onChange={onChangeUser}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Sign In
                </Button>
            </form>      
        </div>
    )
}