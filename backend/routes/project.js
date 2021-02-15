const express = require("express");
const router = express.Router();
const Project = require("../models/projects");
const { getUser } = require("../middleware/common");
const { getProject } = require("../middleware/projects");

// Getting All
router.get("/", getUser, async (req, res) => {
    let projects;
    try {
        projects = await Project.find({ user: res.user });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get("/:id", getProject, (req, res) => {
    res.json(res.project);
});

// Creating one
router.post("/", getUser, async (req, res) => {
    if (req.body.title === "" || req.body.title === undefined || req.body.title === null) {
        return res.status(400).json({ err: "No title is given" });
    }
    const project = new Project({
        user: res.user,
        title: req.body.title,
    });
    try {
        const newProject = await project.save();
        return res.status(201).json(newProject);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch("/:id", getProject, async (req, res) => {
    if (req.body.title === "" || req.body.title === undefined || req.body.title === null) {
        return res.status(400).json({ err: "No title is given" });
    }
    res.project.title = req.body.title;
    try {
        const updatedProject = await res.project.save();
        return res.json(updatedProject);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
});

module.exports = router;
