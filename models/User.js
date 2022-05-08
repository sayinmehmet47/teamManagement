const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: true,
    },
    password: {
      type: String,
      required: true,
    },

    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model('user', userSchema);
