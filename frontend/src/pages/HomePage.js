// HomePage.js
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div>
      <div className='up'>
      <marquee width="100%" direction="right">
      <h2>Website Home Page</h2>
      </marquee>
      </div>
      <nav class='navbar'>
        
        <a href=""><Link to='/real-time'>Live Data</Link></a>
        <a href=""><Link to='/predicted'>Predicted Data</Link></a>
        <a href=""><Link to='/adminlogin'>Admin Login</Link></a>        
        <a href=""><Link to='/login'>User Login</Link></a>      
          
      </nav>
      
      <div className='system'>
        <h2>
          An Aquaculture Management System...
          </h2>
      </div>
    </div>
    );
};

export default HomePage;
