const {
  getItems,
  getItem,
  createTeam,
  deleteTeam,
  addPlayer,
  deletePlayer,
  register,
  login,
  getUser,
  getUsers,
} = require('../../controller/controller');

const express = require('express');
const auth = require('../../middleware/auth');

const router = express.Router();

router.route('/api/items').get(getItems);
router.route('/api/items/:id').get(getItem);
router.route('/api/items/createTeam').post(createTeam);
router.route('/api/items/:id').delete(deleteTeam);
router.route('/api/items/addPlayer/:id').post(addPlayer);
router.route('/api/items/deletePlayer').post(auth, deletePlayer);
router.route('/api/auth/register').post(register);
router.route('/api/auth/login').post(login);
router.route('/api/auth/user').get(getUser);
router.route('/api/users').get(getUsers);

module.exports = router;
