const Client = require('../models/clients');
const Therapist = require('../models/therapists');
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
        console.log(req.user.uid);
        const client = await Client.find({managedBy: req.user.uid})
        console.log(client);
        res.json(client);
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
});

//Update - Add Therapist
clientRouter.put('/client', async (req, res) => {
    try {
        const client = await Client.find({managedBy: req.user.uid});
        const newClient = await Client.findByIdAndUpdate(
            client[0]._id,
            {therapist: [req.body.therapistId]},
            {new: true}
        )
        const therapist = await Therapist.findById(req.body.therapistId);
        therapist.clients.push(client[0]);
        await therapist.save();
        res.json(therapist);
    } catch (error) {
        console.log('error: ', error);
    }
})

module.exports = clientRouter;