import React, { useState, useContext, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import './Auth.css';
import DataService from '../../services/service';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TextField, Button, Paper } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';

export default function Register() {

    const [newUser, setNewUser] = useState({});
    const [legends, setLegends] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
        DataService.legends()
            .then(res => {
                setLegends(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const onChangeNewUser = (e) => {
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    }

    const onChangeMainLegend = (e, value) => {
        setNewUser({
            ...newUser,
            mainLegend: value ? value.name : ""
        });
    }

    const findMainLegend = (array, property, value) => {
        for(var i=0; i < array.length; i++) {
            if (array[i][property] === value) {
                return legends[i].img
            }
        }
    }

    const Register = (e) => {
        e.preventDefault();

        const { email, steamId, friendCode, mainLegend, password, passwordCheck } = newUser;

        if(isNaN(steamId) || isNaN(friendCode)) {
            setErrorMessage("SteamID and Friend Code must be numbers");
        } else {
            const user = {
                email: email,
                steamId: steamId,
                friendCode: friendCode,
                mainLegend: findMainLegend(legends, "name", mainLegend),
                password: password,
                passwordCheck: passwordCheck,
            }
            
            DataService.register(user)
                .then(() => {
                    getLoggedIn();
                    history.push("/");
                })
                .catch((err) => {
                    setErrorMessage(err.response.data.message);
                });
        }
    }

    const defaultProps = {
        options: legends,
        getOptionLabel: (option) => option.name
    };

    const theme = createMuiTheme({
        palette: {
            background: {
                paper: "rgb(20,20,20)"
            },
            type: "dark",
        }
    });

    return (
        <div className="Register">
            <ThemeProvider theme={theme}>
                <Paper elevation={0}>
                    <h1>Create an account</h1>
                    <form onSubmit={Register}>
                        <TextField
                            name="steamId"
                            type="text"
                            margin="normal"
                            label="SteamId"
                            variant="outlined"
                            required
                            onChange={onChangeNewUser} />
                        <TextField
                            name="friendCode"
                            type="text"
                            margin="normal"
                            label="Friend Code"
                            variant="outlined"
                            required
                            onChange={onChangeNewUser} />
                        <Autocomplete
                            {...defaultProps}
                            style={{ minWidth: "200px" }}
                            id="mainLegend"
                            name="mainLegend"
                            onChange={onChangeMainLegend}
                            autoHighlight
                            renderInput={(params) => (
                                <TextField {...params}
                                    required
                                    margin="normal"
                                    name="mainLegend"
                                    value={legends.name}
                                    label="Main Legend"
                                    variant="outlined" />
                                )
                            }
                        />
                        <TextField
                            name="email"
                            type="text"
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={onChangeNewUser} />
                        <TextField
                            name="password"
                            type="password"
                            margin="normal"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={onChangeNewUser} />
                        <TextField
                            name="passwordCheck"
                            type="password"
                            margin="normal"
                            label="Retype Password"
                            variant="outlined"
                            fullWidth
                            required
                            onChange={onChangeNewUser} />
                        <div className="actions">
                            <p style={{margin: "auto 0"}}>Already have an account? Login <a href="/login">here</a></p>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
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
