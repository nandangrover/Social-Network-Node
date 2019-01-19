const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TreeSchema = new Schema({
  user: {
    type: String,
    require: true
  },
  chatId: {
    type: String,
    require: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Tree = mongoose.model("tree", TreeSchema);
