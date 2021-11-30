const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const items = require("./routes/api/items");
const users = require("./routes/api/user");
const auth = require("./routes/api/auth");

app.use(express.json());

require("dotenv").config();
mongoose
  .connect(
    "mongodb+srv://sayinmehmet47:Mardin.1992,@cluster0.ywv3z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  )
  .then(console.log("connected"));
//mongoose.connect(process.env.MONGO_URI).then(console.log('connected'));
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
