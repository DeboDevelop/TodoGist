const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: Date.now,
    },
    listOfTodo: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("Project", projectSchema);
