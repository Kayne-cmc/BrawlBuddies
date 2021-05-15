import React, { useState, useContext, useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom'
import AuthContext from '../../context/AuthContext';
import './Auth.css';
import DataService from '../../services/service';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { TextField, Button, Paper, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

export default function Register() {

    const [newUser, setNewUser] = useState({});
    const [legends, setLegends] = useState([]);
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

    const Register = (e) => {
        e.preventDefault();

        const { email, steamId, friendCode, legendIndex, password, passwordCheck } = newUser;

        const user = {
            email: email,
            steamId: steamId,
            friendCode: friendCode,
            mainLegend: legends[legendIndex].img,
            password: password,
            passwordCheck: passwordCheck,
        }
        
        DataService.register(user)
            .then(() => {
                getLoggedIn();
                history.push("/");
            })
            .catch((err) => {
                console.log(err);
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
                        <FormControl style={{ minWidth: "200px" }}>
                            <InputLabel htmlFor="mainLegend">Main legend</InputLabel>
                            <Select
                            labelId="mainLegend"
                            inputProps={{
                                name: "legendIndex",
                            }}
                            value={newUser.legendIndex ? newUser.legendIndex : "0"}
                            onChange={onChangeNewUser}>
                                {legends && legends.map((legendData, index) => (
                                    <MenuItem value={index} key={index}>{legendData.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                            <p style={{margin: "auto 0"}}>Already have an account? Login <Link to="/login">here</Link></p>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Register
                            </Button>
                        </div>
                    </form>
                </Paper>
            </ThemeProvider>
        </div>
    )
}
