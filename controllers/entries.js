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
        res.json(await Entries.find({}));
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
});

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
        //Find user creating post
        const user = await Clients.find({"managedBy": req.user.uid})

        //Crste entry
        const entry = await Entries.create(req.body)
        
        //Add created entry ID to user's entry array
        user[0].entry.push(entry._id)
        user[0].save();
        
        res.json(entry);
    } catch (error) {
        console.log('Create entry error: ', error)
        res.status(400).render('error.ejs', {status: 400});
    };
});

//SHOW
entriesController.get('/:id', async (req, res) => {
    try {
        res.json(await Entries.findById(req.params.id));
    } catch (error) {
        res.status(400).json('error.ejs', {status: 400})
    }
})


module.exports = entriesController;
