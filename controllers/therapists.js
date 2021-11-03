const therapistRouter = require('express').Router();
const Therapist = require('../models/therapists');

//Index - get ALL therapists (for client dashboard)
therapistRouter.get('/', async (req, res) => {
    try {
        res.json(await Therapist.find({}));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
});

//Create
therapistRouter.post('/', async (req, res) => {
    try {
        res.json(await Therapist.create(req.body));
    } catch (error) {
        res.status(400).render('error.ejs', {status: 400});
    }
});

module.exports = therapistRouter;