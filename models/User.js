const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const User = new mongoose.Schema(
  {
    first_name: { type: "String" },
    last_name: { type: "String" },
    email: { type: "String", require },
    password: { type: "String", require },
    token: { type: "String" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", User);
