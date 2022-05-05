const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Item = require('../../models/Items');

// router.get("/", (req, res) => {
//   Item.find()
//     .sort({ date: -1 })
//     .then((items) => res.json(items));
// });

// router.get('/:id', (req, res) => {
//   const id = req.params.id;
//   console.log(id);
//   Item.findById(id, (err, data) => {
//     if (err) return console.log(err);
//     res.json({ data });
//   });
// });

// router.post('/createTeam', auth, (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//   });
//   newItem.save(function (err, result) {
//     if (err) {
//       console.log(err);
//     } else {
//       res.json(result);
//     }
//   });
// });

// router.delete('/:id', auth, (req, res) => {
//   const id = req.params.id;

//   Item.findByIdAndDelete(id, (err, data) => {
//     if (err) {
//       res.json(err);
//     } else {
//       res.json(data);
//     }
//   });
// });

// router.post('/addPlayer/:id', auth, (req, res) => {
//   const id = req.params.id;
//   Item.findByIdAndUpdate(
//     id,
//     { $push: { players: req.body } },
//     function (err, docs) {
//       if (err) {
//         res.json(err);
//       } else {
//         res.json(docs);
//       }
//     }
//   );
// });

// router.post('/deletePlayer', auth, (req, res) => {
//   const playerName = req.body.playerName; //'ahmet '
//   const teamName = req.body.teamName; //'Team A'
//   res.json('dfas');
//   Item.updateOne(
//     { name: teamName },
//     {
//       $pull: {
//         players: {
//           name: playerName,
//         },
//       },
//     },
//     function (err, docs) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('Removed User : ', docs);
//       }
//     }
//   );
// });

// module.exports = router;
