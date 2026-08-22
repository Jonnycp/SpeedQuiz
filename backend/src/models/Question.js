const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
      index: true,
    },
    timesUsed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Question", QuestionSchema);
