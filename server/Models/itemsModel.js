const mongoose = require("mongoose");

const itemsSchema = mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  details: { type: String },
});

const ItemsModel = new mongoose.model("item", itemsSchema);

module.exports = ItemsModel;
