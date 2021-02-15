require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const projectRoute = require("./routes/project");
const todoRoute = require("./routes/todos");
const app = express();

app.use(cors());

app.use(express.json());

let DATABASE_URL;

if (process.env.ENVIRONMENT == "TEST") {
    DATABASE_URL = process.env.TEST_DATABASE_URL;
} else if (process.env.ENVIRONMENT == "PRODUCTION") {
    DATABASE_URL = process.env.PRODUCTION_DATABASE_URL;
} else {
    DATABASE_URL = process.env.DEVELOPMENT_DATABASE_URL;
}

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use("/auth", authRoute);
app.use("/project", projectRoute);
app.use("/todo", todoRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));

module.exports = app;
