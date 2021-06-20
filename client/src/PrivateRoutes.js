import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import Help from './components/layout/Help';
import Matches from './components/Matches';
import Stats from './components/Stats';

export default function PrivateRoutes() {
    return (
        <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/matches" component={Matches} />   
                <Route exact path="/stats" component={Stats} />
                <Redirect to="/" />
        </Switch>
    )
}
