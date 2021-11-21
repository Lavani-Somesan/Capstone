const mongoose = require("mongoose");
const newsFeedSchema = mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  startDate: {
    type: String,
    required: true
  },

  endDate: {
    type: String,
    required: true
  },

  content: {
    type: String,
    required: true,
  },

  imageURL: {
    type: String,
    required: true,
  }

});
module.exports = mongoose.model("NewsFeed", newsFeedSchema);