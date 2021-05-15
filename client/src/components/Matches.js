import React, { useEffect, useState } from 'react';
import './Matches.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataService from '../services/service';

import { Card, CardHeader, CardMedia, CardContent, Typography, Button, Paper, ThemeProvider, createMuiTheme } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function Matches() {

    const [error, setError] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState();
    const [playerIndex, setPlayerIndex] = useState(0);
    const [matches, setMatches] = useState([]);

    const addFriend = (friendName, index) => {
        DataService.add({
            friendName
        })
        .then(res => {
            setPlayerIndex(index);
            if(res.data.includes("Success")) {
                setError(false);
            } else {
                setError(true)
            }
            setErrorMessage(res.data);
            setTimeout(() => {
                setError(undefined);
            }, 1500);
        })
        .catch(err => {
            console.error(err);
        });
    }

    const theme = createMuiTheme({
        palette: {
            background: {
                paper: "transparent"
            },
            type: "dark",
        }
    });

    function Match(props) {
        return (
            <div className="player">
                <ThemeProvider theme={theme}>
                    <Paper elevation={24}>
                        <Card>
                            <CardMedia
                                image={props.match.mainLegend}
                                title="Main Legend"
                                style={{width: "100px", height: "100px"}}
                            />
                            <div>
                                <CardHeader
                                    title={props.match.name}
                                    subheader={`Elo: ${props.match.rating}`}
                                />
                                <div className="wrapper">
                                    <CardContent>
                                        <Typography variant="body2" component="p">Friend Code: {props.match.friendCode}</Typography>
                                    </CardContent>
                                    <Button className="iconButton" onClick={() => navigator.clipboard.writeText(props.match.friendCode)}><i className="far fa-copy" /></Button>
                                </div>
                            </div>
                            <div style={{ width: "100%" }}></div>
                            <Button className="iconButton" onClick={() => addFriend(props.match.name, props.matchIndex)}><i className="fas fa-user-plus" /></Button>
                        </Card>
                        {(error && props.matchIndex===playerIndex) && (
                            <Alert
                                severity="error"
                            >
                                {errorMessage}
                            </Alert>
                        )}
                        {(error===false && props.matchIndex===playerIndex) && (
                            <Alert
                                severity="success"
                            >
                                {errorMessage}
                            </Alert>
                        )}
                    </Paper>
                </ThemeProvider>
            </div>
        );
    }

    useEffect(() => {
        DataService.matches()
            .then(res => {
                setMatches(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="Matches">

            <ThemeProvider theme={theme}>
                <Paper elevation={0}>
                    <Typography variant="h3" align="center">Matches in your region</Typography>
                </Paper>
            </ThemeProvider>
            
            <div className="players">
                {matches && matches.map((match, index) => (
                    <Match match={match} matchIndex={index} key={index}></Match>
                ))}
            </div>

        </div>
    )
}
