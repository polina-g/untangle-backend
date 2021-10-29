const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Entry = new Schema ({
        client: String,
        feeling: {type: Number, default: 0, required: true},
        emotion: {type: String, default: ''},
        intensity: {type: Number, default: 0, required: true},
        thought: {type: String, default: ''},
        rob: {type: Number, default: 0},
        situation: {type: String, required: true},
        private: {type: Boolean, default: false}
    }, 
    {timestamps: true}
);

module.exports = mongoose.model('Entry', Entry);