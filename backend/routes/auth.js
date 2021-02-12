const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/github", async (req, res) => {
    const code = req.body.code;
    const state = req.body.state;
    console.log(code);
    console.log(state);
    let response = await axios.post(
        `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&state=${state}`,
        {},
        {
            headers: {
                Accept: "application/json",
            },
        }
    );
    console.log("Response :" + response);
    console.log("Response string :" + JSON.stringify(response.data));
    res.status(202).json({ token: response.data.access_token });
});

module.exports = router;
