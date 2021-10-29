const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Therapist = new Schema ({
        acct: {type: String, default: 'therapist'},
        f_name: {type: String, required: true},
        l_name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        license: {type: String, required: true},
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, default: 'United States'},
        img: {type: String, default: '../static/img/therapist_default_img.png'},
        clients: {type: Array, default: []}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Therapist', Therapist); 