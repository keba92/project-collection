const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema({
  idItem: {
    type: String,
    require: true,
  },
  countLike: {
    type: Number,
    default: 0,
    require: true,
  },
  idUsers: {
    type: [String],
    default: [],
    require: true,
  },
});

module.exports = mongoose.model("like", LikeSchema);
