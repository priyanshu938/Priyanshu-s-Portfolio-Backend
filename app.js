require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import routes like this
const skillsRoutes = require("./api/routes/skills");
const projectsRoutes = require("./api/routes/projects");
const certficatesRoutes = require("./api/routes/certificates");
const worksRoutes = require("./api/routes/works");
const userRoutes = require("./api/routes/user");

//connecting with database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//To prevent CORS (Cross-origin resource sharing) error
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
    return res.status(200).json({});
  }
  next();
});

//use routes like this to handle requests
app.use("/skills", skillsRoutes);
app.use("/projects", projectsRoutes);
app.use("/certificates", certficatesRoutes);
app.use("/works", worksRoutes);
app.use("/user", userRoutes);

//error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
