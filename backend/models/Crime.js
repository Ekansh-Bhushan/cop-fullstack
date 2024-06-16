// models/Crime.js
const mongoose = require("mongoose");

const CrimeSchema = new mongoose.Schema({
  lat: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  crime: {
    type: String,
    required: true,
  },
  beat: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Crime", CrimeSchema);
