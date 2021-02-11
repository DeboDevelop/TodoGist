const express = require("express");
const router = express.Router();

router.post("/github", (req, res) => {
    const code = req.body.code;
    console.log(code);
    res.status(202).json({ token: code });
});

module.exports = router;
