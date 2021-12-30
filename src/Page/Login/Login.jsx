import React, { useContext } from 'react'
import { useState } from 'react'
import "./Login.css"
import { LoginFunct } from '../../Context/ApiCall'
import { AuthContext } from '../../Context/AuthContext'

const Login = () => {
    const {dispatch} = useContext(AuthContext)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e)=> {
        e.preventDefault();

        LoginFunct({email, password}, dispatch);
        console.log(email, password);
        setEmail("");
        setPassword("")
    }

    return (
        <div className="login">
            <form className="loginForm" onSubmit={login}>
                <input type="text" placeholder="email" className="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="password" className="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">LogIn</button>
            </form>
        </div>
    )
}

export default Login
