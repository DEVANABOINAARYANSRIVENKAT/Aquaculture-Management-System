import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RealTimePage = () => {
    const [realTimeData, setRealTimeData] = useState({ temperature: [], pH: [] });

    useEffect(() => {
        // Fetch real-time temperature data from the backend API
        axios.get('http://localhost:5000/api/real-time-data')
            .then(response => {
                setRealTimeData(prevState => ({
                    ...prevState,
                    temperature: response.data
                }));
            })
            .catch(error => console.error(error));

        // Fetch real-time pH data from the backend API
        axios.get('http://localhost:5000/api/real-time-ph')
            .then(response => {
                setRealTimeData(prevState => ({
                    ...prevState,
                    pH: response.data
                }));
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Real Time Data</h2>
            <ul>
                {/* Render temperature and pH data side by side */}
                {realTimeData.temperature.map((tempEntry, index) => (
                    <li key={tempEntry.datetime}>
                        {new Date(tempEntry.datetime).toLocaleString()} ---> 
                        Temperature : {tempEntry.temperature} °C,
                        {realTimeData.pH[index] ? ` pH : ${realTimeData.pH[index].ph}` : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RealTimePage;
