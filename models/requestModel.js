const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  partyName: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  quantity: {
    type: String,
    require: true,
  },
  amount: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  senderName: {
    type: String,
    require: true,
  },
  option: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("request", requestSchema);
