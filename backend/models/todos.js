const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    descriptiom: {
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
        default: null,
    },
});

module.exports = mongoose.model("Todo", todoSchema);
