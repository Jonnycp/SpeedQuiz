const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Question", QuestionSchema);