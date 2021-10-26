const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Client = new Schema ({
        acct: {type: String, default: 'client'},
        f_name: {type: String, default: ''},
        l_name: {type: String, default: ''},
        email: {type: String, required: true},
        password: {type: String, required: true},
        therapist: {type: Array, default: []},
        entry: {type: Array, default: []}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Client', Client);