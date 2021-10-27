//=============================================================================
//DEPENDENCIES
//=============================================================================
const entriesController = require('express').Router();
const Entries = require('../models/entries');
const Clients = require('../models/clients');
//=============================================================================
//ROUTES
//=============================================================================

//INDEX
entriesController.get('/', async (req, res) => {
    try {
        res.json(await Entries.find({}))
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
});

//DELETE
entriesController.delete('/:id', async (req, res) => {
    try {
        res.json (await Entries.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
})

//UPDATE
entriesController.put('/:id', async (req, res) => {
    try {
        res.json(await Entries.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true}
        ));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400})
    };
});

//CREATE
entriesController.post('/', async (req, res) => {
    try {
        res.json(await Entries.create(req.body));
    } catch (error) {
        res.status(400).json('error.ejs', {status: 400});
    };
});


module.exports = entriesController;
