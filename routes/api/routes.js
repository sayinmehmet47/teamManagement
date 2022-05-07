const { body } = require('express-validator');

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

router.get('/api/items', getItems);
router.get('/api/item/:id', getItem);
router.post('/api/items/createTeam', auth, createTeam);
router.delete('/api/items/:id', auth, deleteTeam);
router.post('/api/items/addPlayer/:id', addPlayer);
router.post('/api/items/deletePlayer', auth, deletePlayer);
router.post(
  '/api/auth/register',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Please enter a name'),
  ],
  register
);
router.post(
  '/api/auth/login',
  [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  login
);
router.get('/api/auth/user', auth, getUser);
router.get('/api/auth/users', auth, getUsers);

module.exports = router;
