import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [login, setlogin] = useState({ mobileno: '', password: '' });
    const changeHandler = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/login', login).then(res => { localStorage.setItem('token', res.data.token); navigate('/home') }).catch(err => alert(err.response.data));
    }
    return (   
        <div className='loginpage'>
            <div className='up'>
                <marquee width="100%" direction="right">
                    <h2>Login page</h2>
                </marquee>
            </div>
            <div className='login'>            
            <div className="loginadmin"><Link to='/adminlogin' ><button>Login as Admin</button></Link></div>
                <h2 className="loghead">Sign-In</h2>
                <form onSubmit={submitHandler} className="loginform">
                    <label htmlFor="mobileno">Mobileno: <br />
                        <input type="text" placeholder='1234567890' name='mobileno' onChange={changeHandler} required autoComplete='off' />
                    </label>
                    <label htmlFor="password">Password: <br />
                        <input type="password" placeholder='Password@123' name='password' onChange={changeHandler} required />
                    </label>
                        <input className='logmainbtn' type="submit" value="Login" />
                </form>
            <div className="createanact">New User? <Link to='/register'>Sign-up</Link> </div>
            </div>
        </div>        
    )
}