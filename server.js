const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();

// conrollers
const { registerUser, loginUser } = require("./controllers/auth");

const app = express();

// db
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log(err));

//middlewares
app.use(bodyParser.json());
app.use(cors());

app.get("/api", (req, res) => res.status(200).send("Api hit succesfully"));

app.post("/signup", registerUser);

app.get("/login", loginUser);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Your app is listening on port: ${port}`));
