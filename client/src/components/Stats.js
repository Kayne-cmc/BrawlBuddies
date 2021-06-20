import React, { useEffect, useState } from 'react';
import './Stats.css';
import DataService from '../services/service';

import { Paper, TableContainer, Table, TableRow, TableHead, TableCell, Typography, TableBody, ThemeProvider, createMuiTheme, Button } from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

const TransparentTableHead = withStyles(theme => ({
    root: {
      color: 'red'
    }
  }))(TableHead);

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
        DataService.stats()
            .then(res => {
                setRows(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function removeFriend(friendName) {
        DataService.remove({
            friendName
        })
        .then(res => {
            DataService.stats()
            .then(res => {
                setRows(res.data);
            })
            .catch(err => console.log(err));
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

    return (
        <div className="Stats">
            {
                rows && (
                    <>
                            <ThemeProvider theme={theme}>
                                <Paper elevation={0}>
                                    <Typography variant="h3" align="center">Matches in your region</Typography>
                                </Paper>
                            </ThemeProvider>

                            <TableContainer>
                                <Table stickyHeader>
                                    <TransparentTableHead>
                                        <TableRow>
                                            {columns.map(column => (
                                                    <TableCell key={column.id} align="center">{column.id}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TransparentTableHead>
                                    <TableBody>
                                        { rows[0] && rows.map((row, index) => (
                                            <TableRow key={row.name}>
                                                <TableCell align="center">
                                                    {
                                                        index !== 0 && (
                                                            <Button onClick={() => removeFriend(row.name)}><i className="fas fa-user-slash" /></Button>
                                                        )
                                                    }
                                                </TableCell>
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
                            </>
                )
            }
        </div>
    )
}
