const mongoose = require('mongoose');

const StaffMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  station: { type: String, required: true },
});

module.exports = mongoose.model('StaffMember', StaffMemberSchema);
