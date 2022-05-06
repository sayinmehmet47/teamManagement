const bcrypt = require('bcryptjs/dist/bcrypt');
const Item = require('../models/Items');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getItems = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
};

const getItem = (req, res) => {
  const id = req.params.id;
  Item.findById(id, (err, data) => {
    if (err) return console.log(err);
    res.json({ data });
  });
};

const createTeam = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json(result);
    }
  });
};

const deleteTeam = (req, res) => {
  const id = req.params.id;
  Item.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};

const addPlayer = (req, res) => {
  const id = req.params.id;
  Item.findByIdAndUpdate(
    id,
    { $push: { players: req.body } },
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
  res.json('dfas');
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
        console.log(err);
      } else {
        console.log('Removed User : ', docs);
      }
    }
  );
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
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

  if (!email || !password) {
    return res.status(400).json({
      msg: 'Please enter all fields',
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('User does not exist');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error('Invalid credentials');
    const token = jwt.sign({ id: user._id }, '' + process.env.JWT_KEY);
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
