const app = require('./app');
require('dotenv').config();
var server = require('http').Server(app);
const io = require('./socket/socket').init(server);
const myCronJob = require('./cronjob').myCronJob;
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

myCronJob();

server.listen(process.env.PORT || 5000, () => {
  console.log('socket.io server started on port 5000');
});
