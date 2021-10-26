const mongoose = require('mongoose');
const Schema = require.Schema;

const Entry = new Schema ({
        feeling: {Type: Number, default: 0, required},
        emotion: {Type: String, default: ''},
        intensity: {Type: Number, default: 0, required},
        thought: {Type: String, default: ''},
        rob: {Type: Number, default: 0},
        situation: {Type: String, required},
        private: {Type: Boolean, default: false}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Entry', Entry);