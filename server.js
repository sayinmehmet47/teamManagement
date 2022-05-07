const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// const items = require('./routes/api/items');
// const users = require('./routes/api/user');
// const auth = require('./routes/api/auth');

const routes = require('./routes/api/routes');
var server = require('http').Server(app);
const socketIo = require('socket.io');

app.use(express.json());

require('dotenv').config();
mongoose.connect(process.env.MONGO_DB).then(console.log('connected'));
const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(routes);
// app.use('/api/users', users);
// app.use('/api/auth', auth);

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

let interval;

io.on('connection', (socket) => {
  console.log('New client connected');
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);

  socket.on('createPlayer', (data) => {
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit('FromAPI', response);
};

server.listen(process.env.PORT || 5000, () => {
  console.log('socket.io server started on port 5000');
});
