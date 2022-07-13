const mongoose = require("mongoose");

const addquizscoreSchema = new mongoose.Schema({
  score: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  created_at: {
    type: Date,
    required: true,
  },

  updatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("addquizscore", addquizscoreSchema);
