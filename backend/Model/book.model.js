const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
    title: String,
    author : String,
    createdAt: { type: Date, default: Date.now },
    userId : String,
  });
  
  const BookModel = mongoose.model('Book', bookSchema);

  module.exports = BookModel;
