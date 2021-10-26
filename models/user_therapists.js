const mongoose = require('mongoose');
const Schema = require.Schema;

const UserTherapist = new Schema ({
        acct: {Type: String, default: 'therapist'},
        f_name: {Type: String, required},
        l_name: {Type: String, required},
        email: {Type: String, required},
        password: {Type: String, required},
        license: {Type: String, required},
        city: {Type: String, required},
        state: {Type: String, required},
        country: {Type: String, default: 'United States'},
        img: {Type: String, default: '../static/img/therapist_default_img.png'}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('UserTherapist', UserTherapist); 