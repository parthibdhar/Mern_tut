import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const history = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const registerUser = (e) => {

        e.preventDefault()
        alert(" name: " + name + " email: " + email + " password: " + password)
        axios.post('http://localhost:5000/auth/register', { name, email, password })
        .then(res => { 
            // console.log("res: " + res.body) 
            window.alert("client submited ")
            history('/login',{'state': res.status});
        }).catch(err =>{
        });

        // console.log("client submited " );
    }
    return (
        <React.Fragment>
            <h1>Register</h1>
            <hr />
            <form onSubmit={registerUser} >

                <input type="text" value={name} placeholder='name' onChange={(e) => setName(e.target.value)} />
                <input type="email" value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder='password' onChange={(e) => setPassword(e.target.value)} />
                <input type="submit" value={"Register"} />

            </form>

        </React.Fragment>
    )
}

export default Register