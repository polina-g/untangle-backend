//=============================================================================
//DEPENDENCIES
//=============================================================================
const entriesController = require('express').Router();
const Entries = require('../models/entries');
//=============================================================================
//ROUTES
//=============================================================================
entriesController.get('/', async (req, res) => {
    try {
        res.json(await Entries.find({}))
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
})

module.exports = entriesController;
