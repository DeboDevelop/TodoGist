const axios = require("axios");

async function getUser(req, res, next) {
    let user;
    if (req.body.token === null || req.body.token === "") {
        return res.status(400).json({ message: "Invalid Token" });
    }
    try {
        axios.defaults.headers.common["Authorization"] = `token ${req.body.token}`;
        user = await axios.get("https://api.github.com/user");
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user.data.login;
    next();
}

module.exports = { getUser };
