const mongoose = require("mongoose");
const blocklistSchema = mongoose.Schema({
  token: String,
});

const BlackkListModel = mongoose.model("blacklist", blocklistSchema);

module.exports = { BlackkListModel };
