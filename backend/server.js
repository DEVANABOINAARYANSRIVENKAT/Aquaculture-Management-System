const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const user = require('./routes/user');

// Initialize express.js
const app = express();

// To receive JSON data
app.use(express.json());

// Initialize CORS 
app.use(cors({
    origin: '*'
}));

// Connect MongoDB
mongoose.connect('')
    .then(() => console.log("DB is connected"))
    .catch(err => console.error(err));

// LiveTemperature Schema and Model
const LiveTemperatureSchema = new mongoose.Schema({
    datetime: { type: Date, default: Date.now },
    temperature: Number,
});

const LiveTemperature = mongoose.model('LiveTemperature', LiveTemperatureSchema);

// API endpoint to fetch real-time temperature data
app.get('/api/real-time-data', async (req, res) => {
    try {
        const data = await LiveTemperature.find().sort({ datetime: -1 });
        res.json(data);
    } catch (error) {
        console.error('Error fetching temperature data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to fetch real-time pH data from the 'livephvaluess' collection
app.get('/api/real-time-ph', async (req, res) => {
    try {
        const data = await mongoose.connection.db.collection('livephvaluess').find().sort({ datetime: -1 }).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching pH data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PredictedData Schema and API endpoint
const PredictedDataSchema = new mongoose.Schema({
    future_datetime_ist: { type: Date, default: Date.now },
    predicted_temperature: Number,
});

const PredictedData = mongoose.model('PredictedData', PredictedDataSchema);

app.get('/api/predicted-data', async (req, res) => {
    try {
        const data = await PredictedData.find().sort({ future_datetime_ist: -1 });
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to fetch predicted pH data
app.get('/api/predicted-ph', async (req, res) => {
    try {
        const data = await mongoose.connection.db.collection('predicted_ph').find().sort({ future_datetime_ist: -1 }).toArray();
        res.json(data);
    } catch (error) {
        console.error('Error fetching predicted pH data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Auth APIs
app.use('/api/auth', auth);

// Users APIs
app.use('/api/user', user);

// Run server
app.listen(5000, () => console.log('Server is running'));
