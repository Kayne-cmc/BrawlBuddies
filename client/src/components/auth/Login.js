import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Auth.css';
import DataService from '../../services/service';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TextField, Button, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function Login() {

    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    const onChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    const Login = (e) => {
        e.preventDefault();

        const userData = {
            email: user.email,
            password: user.password
        }

        DataService.login(userData)
            .then(() => {
                history.push('/matches');
                getLoggedIn();
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrorMessage(err.response.data.message);
            });
    }

    const theme = createMuiTheme({
        palette: {
            background: {
                paper: "rgb(20,20,20)"
            },
            type: "dark",
        }
    });

    return (
        <div className="Login">
            <ThemeProvider theme={theme}>
                <Paper elevation={0}>
                    <h1>Log in</h1> 
                    <form onSubmit={Login}>
                        <TextField
                            name="email"
                            type="text"
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={onChangeUser}
                        />
                        <TextField
                            name="password"
                            type="password"
                            margin="normal"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={onChangeUser}
                        />
                        <div className="actions">
                            <p style={{margin: "auto 0"}}>Don't have an account? Register <a href="/register">here</a></p>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Sign In
                            </Button>
                        </div>
                    </form>
                    { errorMessage && (
                        <>
                            <Alert severity="error" variant="filled" style={{margin: "1em 0"}}>{errorMessage}</Alert>
                        </>
                    )}
                </Paper>
            </ThemeProvider>  
        </div>
    )
}