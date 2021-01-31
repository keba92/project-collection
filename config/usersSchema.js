const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  theme: {
    type: String,
    require: true,
  },
  lang: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("user", UserSchema);
