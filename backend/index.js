require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRoute = require("./routes/auth");

app.use(cors());

app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));
