const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const DetectFaces = require("./controllers/DetectFaces");

const app = express();
const PORT = process.env.PORT;

// Connect Database
mongoose
  .connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((err) => {
    if (!err) console.log(err);
    else console.log("Successfully connected to DB :)");
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/user", require("./routes/AccountActions"));
app.use("/profile", require("./routes/Profile"));

app.post("/image", (req, res) => DetectFaces(req, res));

app.listen(PORT, () => {
  console.log(`Magic is happening at PORT ${PORT}`);
});
