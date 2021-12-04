const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const items = require("./routes/api/items");
const users = require("./routes/api/user");
const auth = require("./routes/api/auth");

app.use(express.json());

require("dotenv").config();
mongoose.connect(process.env.MONGO_DB).then(console.log("connected"));

app.use(cors({ origin: new URL("http://localhost:5000"), credentials: true })); // Add this 'new' keyword to URL

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
