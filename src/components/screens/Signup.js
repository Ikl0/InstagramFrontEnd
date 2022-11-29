import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const postData = () => {
        fetch("/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error, classes:"#e53935 red darken-1"})
            }
            else {
                M.toast({html: data.message, classes:"#43a047 green darken-1"})
                navigate('/signin')
            }
        })
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field ">
                <h2>Instagram</h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={()=>postData()}>Sign Up</button>
                <h5><Link to="/signin">Already have an account?</Link></h5>
            </div>
        </div>
    )
}

export default SignUp