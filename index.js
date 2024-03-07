const express = require("express");
const app = express();
const port = 9000;

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const cors = require("cors");
app.use(bodyParser.json());
const cors = require("cors");
// MongoDB connection
mongoose
  .connect("mongodb://0.0.0.0:27017/Assign", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Use Routes
// Routes import
app.use("/api", require("./routes"));


app.listen(port, () => console.log(`Server running on port ${port}`));
