import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import RegisterImg from './register.svg'
import swal from 'sweetalert';



function Register() {

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
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
        <>
           <h2 className="text-center page-title m150">Registration Page</h2>
        <div className="register m150">
            <form onSubmit={registerSubmit}>
            <div className="container">
        <img className="img_auth" src={RegisterImg} alt="" />
                    <div className="form-group">
                    <label for="name">Name</label>
                    <input type="text" class="form-control" id="name" name="name" value={user.name} onChange={onChangeInput} required />
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" name="email" value={user.email} onChange={onChangeInput} required />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" class="form-control" id="password" name="password" value={user.password} onChange={onChangeInput} required autoComplete="on" />
                </div>
                <div className="row btns">
                    <button type="submit" className="form_btn">Register</button>
                    <Link to="/login" className="form_link">Login</Link>
                </div>
                    </div>  
            </form>
        </div>
        </>
    )
}

export default Register
