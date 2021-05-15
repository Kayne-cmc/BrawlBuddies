import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import DataService from '../../services/service';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        fontFamily: "'Gloria Hallelujah', cursive"
    }
})

export default function Logout() {

    const { getLoggedIn } = useContext(AuthContext);
    const history = useHistory()

    async function logout() {
        await DataService.logout();
        await getLoggedIn();
        history.push("/");
    }

    const classes = useStyles();

    return (
        <div className="Logout">
            <Button
                className={classes.root}
                variant="text"
                color="secondary"
                onClick={logout}>Log out</Button>
        </div>
    )
}
