import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LoginImg from './login.svg'
import swal from 'sweetalert';


function Login() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const onChangeInput = e =>{
        const {name,value} = e.target
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault();
        try{
            await axios.post('/user/login', {...user});
            localStorage.setItem('firstLogin', true);
            window.location.href = "/";
        }catch(err){
            swal({
                title: "Message from ArvaZon!",
                text: err.response.data.msg,
                icon: "warning",
                button: true,
              })
        }
    }

    return (
        <>
        <h2 className="text-center page-title m150">Login Page</h2>
        <div className="login m150">
            <img className="img_auth" src={LoginImg} alt="" />
            <form onSubmit={loginSubmit}>
            <div className="container">
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value={user.email} onChange={onChangeInput} required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" value={user.password} onChange={onChangeInput} required autoComplete="on" />
                </div>
                <div className="row btns">
                    <button type="submit" className="form_btn">Login</button>
                    <Link to="/register" className="form_link">Register</Link>
                </div>
            </div>  
            </form>
        </div>
        </>
    )
}

export default Login
