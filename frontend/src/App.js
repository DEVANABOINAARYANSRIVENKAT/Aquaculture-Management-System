// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Adminlogin from './pages/Adminlogin';
import Admindash from './pages/Admindash';
import HomePage from './pages/HomePage';
import RealTimePage from './pages/RealTimePage';
import PredictedPage from './pages/PredictedPage';

const App = () => {
    return (
        
            <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Login />} />
                <Route path='/adminlogin' element={<Adminlogin />} />
                <Route path='/admindash' element={<Admindash />} />
                <Route path="/real-time" element={<RealTimePage />} />
                <Route path="/predicted" element={<PredictedPage />} />
                
            </Routes>
        
    );
};

export default App;
