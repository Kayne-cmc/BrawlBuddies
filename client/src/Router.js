import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Nav from './components/layout/Nav';
import Home from './components/layout/Home';
import Help from './components/layout/Help';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Matches from './components/Matches';
import Stats from './components/Stats';

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Nav />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/help" component={Help} />
                {
                    (loggedIn && loggedIn.data === true) && (
                        <>
                            <Route exact path="/matches" component={Matches} />   
                            <Route exact path="/stats" component={Stats} />
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
