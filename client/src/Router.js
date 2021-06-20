import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import Nav from './components/layout/Nav';
import Footer from './components/layout/Footer';

export default function Router() {

    const { loggedIn } = useContext(AuthContext);

    return (
        <BrowserRouter>
            <Nav />
            { (loggedIn && loggedIn.data) ? <PrivateRoutes /> : <PublicRoutes />}
            <Footer />
        </BrowserRouter>
    )
}
