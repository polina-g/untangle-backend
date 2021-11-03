//=============================================================================
//DEPENDENCIES
//=============================================================================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const { 
    MONGODB_URL, 
    PORT = 3001, 
    PRIVATE_KEY_ID, 
    PRIVATE_KEY, 
    CLIENT_ID } = process.env;
const admin = require('firebase-admin');

const app = express(); 
const entriesController = require('./controllers/entries');
const clientsController = require('./controllers/clients');
const therapistController = require('./controllers/therapists');
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
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "untangle-98fed",
        "private_key_id": PRIVATE_KEY_ID,
        "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": "firebase-adminsdk-j2m7c@untangle-98fed.iam.gserviceaccount.com",
        "client_id": CLIENT_ID,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-j2m7c%40untangle-98fed.iam.gserviceaccount.com"
      }
    )
  });

app.use(async function(req, res, next) {
    const token = req.get('Authorization');
    if (token) {
        try {
            const authUser = await admin.auth().verifyIdToken(token.replace('Bearer ', '')); 
            req.user = authUser;  
        } catch (error) {
            console.log('catch error: ', error);
            res.send('error on authorization')
        }
    } 
    next();  
})

//router auth middleware function
function isAuthenticated(req, res, next) {
    if (req.user) return next();
    else res.status(401).json({message: 'unauthorized'});
}

app.use('/api/entries', isAuthenticated, entriesController);
app.use('/api/clients', isAuthenticated, clientsController);
app.use('/api/therapists', isAuthenticated, therapistController);
//=============================================================================
//ROUTES - CATCH API CALLS WITH NO DATA
//=============================================================================
app.get('/api', (req, res) => {
    res.json({message: 'Welcome to the Untangle API'});
});
app.get('/api/*', (req, res) => res.status(404). json({message: 'The route was not found'}));
//=============================================================================
//LISTENER
//=============================================================================
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));