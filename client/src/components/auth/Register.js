import React, { useState } from 'react';
import axios from 'axios';

export default function Register(props) {

    const [newUser, setNewUser] = useState({});

    const onChangeNewUser = (e) => {
        setNewUser({
            ...newUser,
            [e.target.id]: e.target.value
        });
    }

    const Register = (e) => {
        e.preventDefault();

        const { username, email, name, steamId, password, passwordCheck} = newUser;

        const user = {
            username: username,
            email: email,
            name: name,
            steamId: steamId,
            password: password,
            passwordCheck: passwordCheck,

        }
        
        axios.post("http://localhost:5000/auth/register", user)
            .then(res => {

            })
    }

    return (
        <div className="Register">
            <h1>Create an account</h1>
            <form onSubmit={Register}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="text"
                    value={newUser.email}
                    placeholder="Email"
                    onChange={onChangeNewUser} />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="text"
                    value={newUser.password}
                    placeholder="Password"
                    onChange={onChangeNewUser} />
                <label htmlFor="passwordCheck">Verify your password</label>
                <input
                    id="passwordCheck"
                    type="text"
                    value={newUser.passwordCheck}
                    placeholder="Retype your password"
                    onChange={onChangeNewUser} />
                <button type="submit">Register</button>
            </form>            
        </div>
    )
}
