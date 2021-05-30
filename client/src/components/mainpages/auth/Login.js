import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import LoginImg from './login.svg'
import swal from 'sweetalert';
import AOS from 'aos';
import "aos/dist/aos.css";


function Login() {

    useEffect(() => {
        AOS.init({duration: 750})
    })

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
        <React.Fragment>
        <h2 data-aos="fade-in" className="text-center page-title m150">Login Page</h2>
        <div data-aos="zoom-in" className="login m150">
            <img className="img_auth" src={LoginImg} alt="" />
            <form onSubmit={loginSubmit}>
            <div className="container">
                <div data-aos="zoom-in" data-aos-delay="300" className="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value={user.email} onChange={onChangeInput} required />
                </div>
                <div class="form-group" data-aos="zoom-in" data-aos-delay="500">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" value={user.password} onChange={onChangeInput} required autoComplete="on" />
                </div>
                <div className="row btns">
                    <button data-aos="fade-up" type="submit" className="form_btn">Login</button>
                    <Link data-aos="fade-up" to="/register" className="form_link">Register</Link>
                </div>
            </div>  
            </form>
        </div>
        </React.Fragment>
    )
}

export default Login
