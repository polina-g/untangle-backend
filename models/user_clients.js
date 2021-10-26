const mongoose = require('mongoose');
const Schema = require.Schema;

const UserClient = new Schema ({
        acct: {Type: String, default: 'client'},
        f_name: {Type: String, default: ''},
        l_name: {Type: String, default: ''},
        email: {Type: String, required},
        password: {Type: String, required},
        therapist: {Type: Array, default: []},
        entry: {Type: Array, default: []}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('UserClient', UserClient);