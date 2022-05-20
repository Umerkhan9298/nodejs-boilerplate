const User = require("../models/User");
const crypto = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

exports.registerUser = async (req, res) => {
  const obj = {};
  obj.first_name = req.body.first_name;
  obj.last_name = req.body.last_name;
  obj.email = req.body.email;

  const token = jwt.sign(obj, 'NYT"Ob)eP[4gWmG-(4uo"S(9oK=HTp');

  obj.token = token;

  const decryptedPassword = crypto.hashSync(req.body.password, saltRound);
  obj.password = decryptedPassword;

  const newUser = await new User(obj);

  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser === null) {
    newUser.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
  } else {
    console.log("Email is already in use.");
  }
};

exports.loginUser = async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });
  const match = crypto.compareSync(req.body.password, user.password);
  if (!user) {
    console.log("User not found!");
  } else if (!match) {
    console.log("Password is not valid!");
  } else {
    res.send(user);
  }
};
