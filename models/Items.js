const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: "name cannot be blank",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  teams: [{ name: String, players: [{ name: String, age: Number }] }],
});

module.exports = Item = mongoose.model("item", schema);
