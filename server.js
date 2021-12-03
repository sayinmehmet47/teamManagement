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
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

app.use(cors());

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

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

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
