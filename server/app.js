const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

//using redis.createClient() method
const redis = require('redis');

const client = redis.createClient(6379);

client.on('error', (error) => {
  console.error(error);
});

const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
const routes = require('./routes/api/routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
mongoose.connect(process.env.MONGO_DB).then(console.log('connected'));

const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
// Setting response recure and compress assets
app.use(helmet());
app.use(compression());

app.use(routes);

if (
  process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'staging'
) {
  // Set static folder
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

module.exports = app;
