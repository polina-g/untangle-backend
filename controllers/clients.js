const Client = require('../models/clients');
const clientRouter = require('express').Router();

//Index - get ALL clients
clientRouter.get('/', async (req, res) => {
    try {
        res.json(await Client.find({}));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
});

//Create
clientRouter.post('/', async (req, res) => {
    try {
        res.json(await Client.create(req.body));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
});

//Show - Get specific client
clientRouter.get('/client', async (req, res) => {
    try {
        res.json(await Client.find({managedBy: req.user.uid}));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
})

module.exports = clientRouter;