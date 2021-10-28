//=============================================================================
//DEPENDENCIES
//=============================================================================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { MONGODB_URL, PORT = 3001} = process.env;
const admin = require('firebase-admin');
const serviceAccount = require('./untangle-98fed-firebase-adminsdk-j2m7c-296acd69e7.json');

const app = express(); 
const entriesController = require('./controllers/entries');
const contactController = require('./controllers/clients');
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
app.use(express.static('public'))

//Authorization Middleware
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

app.use(async function(req, res, next) {
    const token = req.get('Authorization');
    console.log('this is token ', token);
    const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
    console.log(authUser);
    req.user = authUser;
    next();
})

//router auth middleware function
function isAuthenticated(req, res, next) {
    if (req.user) return next();
    else res.status(401).json({message: 'unauthorized'});
}

app.use('/api/entries', isAuthenticated, entriesController);
app.use('/api/contacts', isAuthenticated, contactController);

app.get('/api', (req, res) => {
    res.json({message: 'Welcome to the Untangle API'});
});
app.get('/api/*', (req, res) => res.status(404). json({message: 'The route was not found'}));
//=============================================================================
//LISTENER
//=============================================================================
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));