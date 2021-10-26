//=============================================================================
//DEPENDENCIES
//=============================================================================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { MONGODB_URL, PORT = 3001} = process.env;
const app = express(); 
//=============================================================================
//DATABASE
//=============================================================================
mongoose.connect(MONGODB_URL)
mongoose.connection
    .on('error', (error) => console.log('Something went wrong connecting MongoDB', error))
    .on('connected', () => console.log('MongoDB connected'))
    .on('disconnected', () => console.log('MongoDB disconnected'));
//=============================================================================
//MIDDLEWARE
//=============================================================================
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
//=============================================================================
//LISTENER
//=============================================================================
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));