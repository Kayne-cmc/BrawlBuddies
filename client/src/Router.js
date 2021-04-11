import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Nav from './components/layout/Nav';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import Matches from './components/Matches';

export default function Router() {

    const { loggedIn } = useContext(AuthContext);
    console.log(loggedIn);

    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                {
                    (loggedIn && loggedIn.data === true) && (
                        <>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/dashboard" component={Dashboard} />
                            <Route exact path="/matches" component={Matches} />   
                        </>
                    )
                }
                {
                    (loggedIn && loggedIn.data === false) && (
                        <>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} /> 
                        </>
                    )
                }
                          
            </Switch>
        </BrowserRouter>
    )
}
