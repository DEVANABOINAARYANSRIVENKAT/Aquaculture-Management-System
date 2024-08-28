import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Adminlogin() {
    const navigate = useNavigate();
    const [login, setlogin] = useState({ username: '', password: '' });
    const changeHandler = (e) => {
        setlogin({ ...login, [e.target.name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/adminlogin', login).then(res => { navigate('/admindash') }).catch(err => alert(err.response.data));
    }
    return (
        <div>
            <div className='up'>
            <marquee width="100%" direction="right">
                <h2>Admin login</h2>
            </marquee>
            </div>            
            <div className='login'>
            <h2 className="loghead">Admin Sign-In</h2>
            <form onSubmit={submitHandler} className="loginform">
                <label htmlFor="email">Username: <br />
                    <input type="text" placeholder='admin123' name='username' onChange={changeHandler} required autoComplete='off' />
                </label>
                <label htmlFor="password">Password: <br />
                    <input type="password" placeholder='admin123' name='password' onChange={changeHandler} required />
                </label>
                <input className='logmainbtn' type="submit" value="Login" />
            </form>
            <div className="createanact">New coustomer? <Link to='/register'>Sign-up</Link> </div>
        </div>
        </div>
    )
}