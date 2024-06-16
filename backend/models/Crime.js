// models/Crime.js
const mongoose = require('mongoose');

const CrimeSchema = new mongoose.Schema({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    typeOfCrime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Crime', CrimeSchema);
