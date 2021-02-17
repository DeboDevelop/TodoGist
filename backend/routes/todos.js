const express = require("express");
const router = express.Router();
const Todo = require("../models/todos");
const { getUser } = require("../middleware/common");
const { getTodo, validProject, findProject } = require("../middleware/todos");

// Getting All
router.post("/", getUser, validProject, async (req, res) => {
    let todos;
    try {
        todos = await Todo.find({ user: res.user, project: req.body.project });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get("/:id", getTodo, (req, res) => {
    res.json(res.todo);
});

// Creating one
router.post("/create", getUser, validProject, async (req, res) => {
    if (req.body.description === "" || req.body.description === undefined || req.body.description === null) {
        return res.status(400).json({ err: "No Description is given" });
    }
    const todo = new Todo({
        user: res.user,
        description: req.body.description,
        project: req.body.project,
    });
    try {
        const newTodo = await todo.save();
        res.project.listOfTodo += 1;
        await res.project.save();
        return res.status(201).json(newTodo);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch("/:id", getTodo, async (req, res) => {
    if (req.body.description !== null && req.body.description !== undefined && req.body.description !== "") {
        res.todo.description = req.body.description;
    }
    if (req.body.status !== null && req.body.status !== undefined) {
        res.todo.status = req.body.status;
    }
    res.todo.updatedDate = Date.now();
    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete("/:id", getTodo, findProject, async (req, res) => {
    try {
        await res.todo.remove();
        res.project.listOfTodo -= 1;
        await res.project.save();
        res.json({ message: "Deleted Todo" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
