const mongoose = require("mongoose");

const mailSchema = mongoose.Schema({
  user: {
    type: String,
    required: true,
    unique: true,
  },

  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Mails", mailSchema);
