const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// port
const port = process.env.PORT || 4000;

// setting cors
app.use(cors());

// Parsing data in JSON
app.use(express.json());

// Database connection file
require("./db/mongoose");

// Routes
app.use(require("./routes/request"));

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(port, () => console.log(`Server is up on port ${port}`));
