const Todo = require("../models/todos");
const Project = require("../models/projects");

async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: "Cannot find todo" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.todo = todo;
    next();
}

async function validProject(req, res, next) {
    let project;
    try {
        project = await Project.findById(req.body.project);
        if (project == null) {
            return res.status(404).json({ message: "Cannot find project" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.project = project;
    next();
}

async function findProject(req, res, next) {
    let project;
    try {
        project = await Project.findById(res.todo.project);
        if (project == null) {
            return res.status(404).json({ message: "Cannot find project" });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.project = project;
    next();
}

module.exports = { getTodo, validProject, findProject };
