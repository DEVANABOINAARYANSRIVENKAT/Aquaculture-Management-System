import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [register, setregister] = useState({ name: '', username: '', mobileno: '', password: '' });
    const changeHandler = (e) => {
        setregister({ ...register, [e.target.name]: e.target.value });
    }
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/api/auth/register`, register).then(res => { alert(res.data); navigate('/login') }).catch(err => alert(err.response.data));
    }
    return (
        <div>
            <div className='up'>
            <marquee width="100%" direction="right">
                <h2>Register page </h2>
            </marquee>
            </div>
        <div className='register'>            
            <div className="loginadmin"><Link to='/adminlogin' ><button>Login as Admin</button></Link></div>
            <h2 className="regishead">Sign-up</h2>
            <form className="regisform" onSubmit={submitHandler}>
                <label htmlFor="name">Name: <br />
                    <input type="text" placeholder='fullname' name='name' onChange={changeHandler} autoComplete='off' required />
                </label>
                <label htmlFor="name">Username: <br />
                    <input type="text" placeholder='name' name='username' onChange={changeHandler} autoComplete='off' required />
                </label>
                <label htmlFor="name">Mobileno: <br />
                    <input type="text" placeholder='1234567890' name='mobileno' onChange={changeHandler} autoComplete='off' required />
                </label>
                <label htmlFor="name">Password: <br />
                    <input type="password" placeholder='Password@123' name='password' onChange={changeHandler} autoComplete='off' required />
                </label>                
                <input className='regisbtn' type="submit" value="Register" />
            </form>
            <div className="already">Already have an account? <Link to='/login'>Sign-In</Link></div>
        </div>
        </div>
    )
}
