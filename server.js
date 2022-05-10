const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const routes = require('./routes/api/routes');
var server = require('http').Server(app);
const io = require('./socket/socket').init(server);
app.use(express.json());

require('dotenv').config();
mongoose.connect(process.env.MONGO_DB).then(console.log('connected'));
const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(routes);

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

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log('socket.io server started on port 5000');
});
