import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RegisterImg from './register.svg'
import swal from 'sweetalert';
import AOS from 'aos';
import "aos/dist/aos.css";



function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {
        AOS.init({duration: 750})
    })

    const onChangeInput = e =>{
        const {name,value} = e.target
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault();
        try{
            await axios.post('/user/register', {...user});
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
           <h2 data-aos="fade-in" className="text-center page-title m150">Registration Page</h2>
        <div data-aos="zoom-in" className="register m150">
            <form onSubmit={registerSubmit}>
            <div className="container">
        <img className="img_auth" src={RegisterImg} alt="" />
                    <div data-aos="zoom-in" data-aos-delay="300" className="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" value={user.name} onChange={onChangeInput} required />
                </div>
                <div data-aos="zoom-in" data-aos-delay="500" className="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value={user.email} onChange={onChangeInput} required />
                </div>
                <div data-aos="zoom-in" class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" value={user.password} onChange={onChangeInput} required autoComplete="on" />
                </div>
                <div className="row btns">
                    <button data-aos="fade-up" type="submit" className="form_btn">Register</button>
                    <Link data-aos="fade-up" to="/login" className="form_link">Login</Link>
                </div>
                    </div>  
            </form>
        </div>
        </React.Fragment>
    )
}

export default Register
