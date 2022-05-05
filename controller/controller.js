const Item = require('../models/Items');

const getItems = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};

module.exports = { getItems };
