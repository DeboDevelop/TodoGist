const express = require("express");
const router = express.Router();
const Project = require("../models/projects");
const { getUser } = require("../middleware/common");

router.get("/", getUser, (req, res) => {
    res.status(200).json({ user: res.user });
});

// Getting One
router.get("/:id", (req, res) => {});

// Creating one
router.post("/", async (req, res) => {});

// Updating One
router.patch("/:id", async (req, res) => {});

// Deleting One
router.delete("/:id", async (req, res) => {});

module.exports = router;
