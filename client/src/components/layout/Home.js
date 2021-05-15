import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Home.css';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

export default function Home() {

    const { loggedIn } = useContext(AuthContext);

    const theme = createMuiTheme({
        palette: {
            background: {
                paper: "transparent"
            },
            type: "dark",
        }
    });

    return (
        <div className="Home">
            <ThemeProvider theme={theme}>
                <Paper elevation={0}>
                    <Typography variant="h3" align="center">Welcome to BrawlBuddies!</Typography>
                    <div className="cards">
                        <Link to={(loggedIn && loggedIn.data) ? "matches" : "login"} className= "first card" style={{textDecoration: "none", color: "black"}}>
                            <i className="fas fa-users"/>
                            <h3>Find new friends</h3>
                        </Link>
                        <Link to={(loggedIn && loggedIn.data) ? "stats" : "login"} className="second card" style={{textDecoration: "none", color: "black"}}>
                            <i className="fas fa-chart-line"/>
                            <h3>Check your stats</h3>
                        </Link>
                        <Link to={(loggedIn && loggedIn.data) ? "stats" : "login"} className="third card" style={{textDecoration: "none", color: "black"}}>
                            <i className="fas fa-trophy"></i>
                            <h3>Check your friend's stats</h3>
                        </Link>
                    </div>
                </Paper>

            </ThemeProvider>


        </div>
    )
}
