import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PredictedPage = () => {
    const [predictedData, setPredictedData] = useState({ predicted_temperature: [], pH: [] });

    useEffect(() => {
        // Fetch predicted temperature data from the backend API
        axios.get('http://localhost:5000/api/predicted-data')
            .then(response => {
                setPredictedData(prevState => ({
                    ...prevState,
                    predicted_temperature: response.data
                }));
            })
            .catch(error => console.error(error));

        // Fetch predicted pH data from the backend API
        axios.get('http://localhost:5000/api/predicted-ph')
            .then(response => {
                setPredictedData(prevState => ({
                    ...prevState,
                    pH: response.data
                }));
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Predicted Data</h2>
            <ul>
                {/* Render predicted temperature and pH data side by side */}
                {predictedData.predicted_temperature.map((entry, index) => (
                    <li key={entry.future_datetime_ist}>
                        {new Date(entry.future_datetime_ist).toLocaleString()} ---> 
                        Predicted Temperature : {entry.predicted_temperature} °C,
                        {predictedData.pH[index] ? ` Predicted pH : ${predictedData.pH[index].predicted_ph}` : ''}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PredictedPage;
