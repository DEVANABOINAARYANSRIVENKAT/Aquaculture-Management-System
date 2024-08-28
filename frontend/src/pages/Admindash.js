import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Admindash() {
    const [users, setusers] = useState([]);
    const deleteHandler = (id) => {
        axios.delete(`http://localhost:5000/api/user/${id}`).then(res => window.location.reload(false));
    }
    useEffect(() => {
        axios.get('http://localhost:5000/api/user').then(res => setusers(res.data));
    }, [])
  return (
    <div>
        <div className='up'>
        <marquee width="100%" direction="right">
            <h2>Admin Dashboard</h2>
        </marquee>
        </div>        
        <div className='ad'>
        <h2>Users</h2>
        </div><div className='homebtn'> <p><Link to='/home'><button>Return to Home</button></Link></p> </div>
        {users.length > 0 && users.map(user => {
            return(
                <div key={user._id} className="user">
                    <div className="name"><h3>Name</h3>{user.name}</div>
                    <div className="username"><h3>Username</h3>{user.username}</div>
                    <div className="usermail"><h3>Usermobileno</h3>{user.mobileno}</div>
                    <div className="deltebtn"><button onClick={() => deleteHandler(user._id)}>Delete</button></div>
                </div>
            )
        })} 
    </div>
  )
}
