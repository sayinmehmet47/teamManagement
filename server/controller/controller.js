const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs/dist/bcrypt');
const Item = require('../models/Items');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const io = require('../socket/socket');
const redis = require('redis');

const client = redis.createClient(6379);

client.on('error', (error) => {
  console.error(error);
});

const getItems = (req, res) => {
  Item.find()
    .populate({
      path: 'owner',
      model: User,
      select: 'name',
    })
    .sort({ date: -1 })
    .then((items) => {
      // client.setex(search, 600, JSON.stringify(data.data));

      res.json(items);
    });
};

const getItem = (req, res) => {
  const id = req.params.id;
  Item.findById(id, (err, data) => {
    if (err) return console.log(err);
    res.json({ data });
  });
};

const createTeam = async (req, res) => {
  const userId = req.user.id;
  const newItem = new Item({
    name: req.body.name,
    owner: userId,
  });
  newItem.save((err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Server Error',
      });
    }
  });

  await newItem.populate({
    path: 'owner',
    model: User,
    select: 'name',
  });

  await User.findByIdAndUpdate(
    userId,
    { $push: { teams: newItem } },
    { new: true }
  );
  console.log(newItem);
  io.getIO().emit('postsChannel', {
    action: 'creatingTeam',
    // team: { ...newItem._doc, _id: newItem._id.toString() },
    team: newItem,
  });
  res.json(newItem);
};

const deleteTeam = (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
      io.getIO().emit('postsChannel', {
        action: 'deletingTeam',
        teamId: id,
      });
    }
  });
};

const addPlayer = (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(
    id,
    { $push: { players: req.body } },
    { new: true },
    function (err, docs) {
      if (err) {
        res.json(err);
      } else {
        res.json(docs);
      }
    }
  );
};

const deletePlayer = (req, res) => {
  const playerName = req.body.playerName; //'ahmet '
  const teamName = req.body.teamName; //'Team A'
  Item.updateOne(
    { name: teamName },
    {
      $pull: {
        players: {
          name: playerName,
        },
      },
    },
    function (err, docs) {
      if (err) {
        res.json(err);
      } else {
        res.json(docs);
      }
    }
  );
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      msg: 'Please enter all fields',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error('User already exists');
    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error('Something went wrong with bcrypt');

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error('Something went wrong hashing the password');

    const newUser = new User({
      name,
      email,
      password: hash,
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error('Something went wrong saving the user');

    const token = jwt.sign({ id: savedUser._id }, '' + process.env.JWT_KEY);
    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        email: savedUser.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      msg: 'Please enter all fields',
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');

    const token = jwt.sign({ id: user._id }, '' + process.env.JWT_KEY, {
      expiresIn: '1h',
    });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) throw Error('User does not exist');
    res.json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

module.exports = {
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
};
