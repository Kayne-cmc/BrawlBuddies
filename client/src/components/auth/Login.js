import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

export default function Login(props) {

    const [user, setUser] = useState({});
    const { getLoggedIn } = useContext(AuthContext);

    const onChangeUser = (e) => {
        setUser({
            ...user,
            [e.target.id]: e.target.value
        });
    }

    const Login = (e) => {
        e.preventDefault();
        const userData = {
            email: user.email,
            password: user.password
        }

        axios.post("http://localhost:5000/auth/login", userData)
            .then(() => {
                props.history.push('/home');
                getLoggedIn();
            })
            .catch(err => console.error(err));
    }

    return (
        <div className="Register">
            <h1>Log in</h1>
            <form onSubmit={Login}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={user.email}
                    placeholder="Email"
                    onChange={onChangeUser} />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="text"
                    value={user.password}
                    placeholder="Password"
                    onChange={onChangeUser} />
                <button type="submit">Log in</button>
            </form>            
        </div>
    )
}
