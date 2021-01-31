const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  idItem: {
    type: String,
    require: true,
  },
  arrComment: {
    type: [String],
    default: [],
    require: true,
  },
});
CommentSchema.index({ "$**": "text" });
module.exports = mongoose.model("comment", CommentSchema);
