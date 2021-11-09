const mongoose = require("mongoose");
const inventorySchema = mongoose.Schema({

  title: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  imageURL: {
    type: String,
    required: true,
  },

  numInStock: {
    type: Number,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  }

});
module.exports = mongoose.model("Inventory", inventorySchema);