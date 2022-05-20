const User = require("../models/User");
const crypto = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRound = 10;

exports.registerUser = async (req, res) => {
  const obj = {};
  obj.first_name = req.body.obj.first_name;
  obj.last_name = req.body.obj.last_name;
  obj.email = req.body.obj.email;

  const token = jwt.sign(obj, 'NYT"Ob)eP[4gWmG-(4uo"S(9oK=HTp');

  obj.token = token;

  const decryptedPassword = crypto.hashSync(req.body.obj.password, saltRound);
  obj.password = decryptedPassword;

  const newUser = await new User(obj);

  const existingUser = await User.findOne({ email: req.body.obj.email });

  if (existingUser === null) {
    newUser.save((err, user) => {
      if (err) {
        console.log(err);
      } else {
        res.json(user);
      }
    });
  } else {
    res.status(400).json({
      message: "Email is already in use.",
    });
  }
};

exports.loginUser = async (req, res) => {
  if (req.body.obj.email) {
    const user = await User.findOne({
      email: req.body.obj.email,
    });
    const match = crypto.compareSync(req.body.obj.password, user.password);
    if (!user) {
      res.status(400).json({
        message: "User not found!",
      });
    } else if (!match) {
      res.status(400).json({
        message: "Password is not valid!",
      });
    } else {
      res.json(user);
    }
  } else {
    res.status(400).json({
      message: "Email is missing",
    });
  }
};
