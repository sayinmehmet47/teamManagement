const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Item = require('../../models/Items');

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id);
  Item.findById(id, (err, data) => {
    if (err) return console.log(err);
    res.json({ data });
  });
});

router.post('/', auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save((err, data) => {
    if (err) console.log(err);
    res.json(data);
  });
});

router.delete('/:id', auth, (req, res) => {
  const id = req.params.id;

  Item.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
