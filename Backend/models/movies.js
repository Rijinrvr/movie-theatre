const mongoose = require("mongoose");

let movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageurl: {
    type: String,
    required: true,
  },
  treaterName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});
let Movie = mongoose.model("Movie", movieSchema);
module.exports = { Movie, movieSchema };