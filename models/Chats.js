const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  from: {
    type: String,
    require: true
  },
  to: {
    type: String,
    require: true
  },
  text: {
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

module.exports = Chats = mongoose.model("chats", ChatSchema);
