const mongoose = require("mongoose");
const ItemSchema = new mongoose.Schema({
  idUser: {
    type: String,
    require: true,
  },
  idCollect: {
    type: String,
    require: true,
  },
  tag: {
    type: [String],
    require: true,
  },
  dataItem: {
    type: String,
    require: true,
  },
  poleItem: {
    type: String,
    require: true,
  },
});
ItemSchema.index({ "$**": "text" });
module.exports = mongoose.model("item", ItemSchema);
