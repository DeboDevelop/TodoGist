const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/github", async (req, res) => {
    const code = req.body.code;
    if (code === null) {
        return res.status(400).json({ error: "Code is null" });
    }
    let response = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}`,
        {},
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    console.log("Response string :" + JSON.stringify(response.data));
    //error -> response.data.error
    if (response.data.error !== undefined) {
        return res.status(400).json(response.data.error);
    }
    return res.status(202).json({ token: response.data.access_token });
});

module.exports = router;
