const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const helmet = require("helmet");
const compression = require("compression");

const routes = require("./routes/api/routes");

app.use(express.json());

mongoose.connect(process.env.MONGO_DB).then(console.log("connected"));

const corsOptions = {
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(helmet()); // Setting headers covered by helmet secure
app.use(compression()); // set assets compressed by compression

app.use(cors(corsOptions));

app.use(routes);

if (
  process.env.NODE_ENV === "production" ||
  process.env.NODE_ENV === "staging"
) {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

module.exports = app;
