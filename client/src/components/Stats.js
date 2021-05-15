import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Stats.css';
import DataService from '../services/service';

import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, Typography, TableBody, ThemeProvider, createMuiTheme, Button } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        background: {
            paper: "rgb(50,50,50)"
        },
        type: "dark",
    }
});

export default function Stats() {

    const [rows, setRows] = useState([]);
    const columns = [
        { id: "", label:"Actions", minwidth: 10 },
        { id: "Player Name", label: "Player Name", minwidth: 200 },
        { id: "Elo", label: "Elo", minWidth: 100 },
        { id: "Highest Elo", label: "Highest Elo", minWidth: 200 },
        { id: "Current Tier", label: "Current Tier", minWidth: 200 },
    ];

    useEffect(() => {
        axios
            .get("http://localhost:5000/data/stats")
            .then(res => {
                setRows(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const removeFriend = (friendName) => {
        DataService.remove({
            friendName
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.error(err);
        });
    }

    return (
        <div className="Stats">
            {
                rows && (
                    <ThemeProvider theme={theme}>
                        <Paper elevation={0}>
                            <Typography variant="h3" align="center">Stats</Typography>
                            <TableContainer>
                                <Table stickyHeader>
                                    <TableHead>
                                        <TableRow>
                                            {columns.map(column => (
                                                    <TableCell key={column.id} align="center">{column.id}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => (
                                            <TableRow>
                                                <TableCell align="center"><Button onClick={removeFriend(row.name)}><i className="fas fa-user-slash" /></Button></TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.rating}</TableCell>
                                                <TableCell align="center">{row.peak_rating}</TableCell>
                                                <TableCell align="center">{row.tier}</TableCell>
                                            </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </ThemeProvider>
                )
            }
        </div>
    )
}
