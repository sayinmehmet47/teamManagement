const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: 'name cannot be blank',
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Item = mongoose.model('item', schema);
