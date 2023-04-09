const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  book: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Library", LibrarySchema);
