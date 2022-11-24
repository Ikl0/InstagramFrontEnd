import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import M from 'materialize-css'

const SignIn = () => {
    const navigate = useNavigate()

    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const postData = () => {
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }
            else {
                M.toast({html: "Signed in", classes:"#43a047 green darken-1"})
                navigate('/')
            }
        })
    }
    return (
        <div className = "mycard">
            <div className="card auth-card input-field ">
                <h2>Instagram</h2>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postData()}>Sign In</button>
                <h5><Link to="/signup">Don`t have an account?</Link></h5>
            </div>
        </div>
    )
}

export default SignIn
