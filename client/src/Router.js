import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Nav from './components/layout/Nav';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Matches from './components/Matches';

export default function Router() {

    const { loggedIn } = useContext(AuthContext);
    console.log(loggedIn);

    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/matches" component={Matches} />                
            </Switch>
        </BrowserRouter>
    )
}
