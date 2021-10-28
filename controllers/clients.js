const Client = require('../models/clients');
const clientRouter = require('express').Router();

clientRouter.get('/', async (req, res) => {
    try {
        res.json(await Client.find({}));
    } catch (error) {
        
    }
});

clientRouter.post('/', async (req, res) => {
    try {
        res.json(await Client.create(req.body));
    } catch (error) {
        
    }
})

module.exports = clientRouter;