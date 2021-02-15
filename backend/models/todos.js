const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    project: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

module.exports = mongoose.model("Todo", todoSchema);
