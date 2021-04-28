import React from 'react';
import {Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/layout/Home';
import Help from './components/layout/Help';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

export default function PublicRoutes() {
    return (
        <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/help" component={Help} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} /> 
                <Redirect to="/" />
        </Switch>
    )
}