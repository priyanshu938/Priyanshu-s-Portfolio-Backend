require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");

//import routes like this
const skillsRoutes = require("./api/routes/skills");
const projectsRoutes = require("./api/routes/projects");
const certficatesRoutes = require("./api/routes/certificates");
const worksRoutes = require("./api/routes/works");
const resumeRoutes = require("./api/routes/resume");
const changePasswordRoutes = require("./api/routes/changePassword");
const userRoutes = require("./api/routes/user");
const videosRoutes = require("./api/routes/videos");
const testimonialRoutes = require("./api/routes/testimonial");
const contactRoutes = require("./api/routes/contact");
const emailViaFormRoutes = require("./api/routes/emailViaForm");
const chatbotRoutes = require("./api/routes/chatbot");

//connecting with database
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/email_attachments", express.static("email_attachments")); //to publicly access static folder uploads
//To prevent CORS (Cross-origin resource sharing) error
app.use(
  cors({
    origin: [
      "https://priyanshu-tiwari-portfolio.netlify.app",
      "https://priyanshu-portfolio-dashboard.netlify.app",
      "http://localhost:3000",
    ],
  })
);

//to fix zero downtime of render
app.use("/healthcheck", (req, res) => {
  res.status(200).send("OK");
});

//use routes like this to handle requests
app.use("/skills", skillsRoutes);
app.use("/projects", projectsRoutes);
app.use("/certificates", certficatesRoutes);
app.use("/works", worksRoutes);
app.use("/resume", resumeRoutes);
app.use("/forgotPassword", changePasswordRoutes);
app.use("/user", userRoutes);
app.use("/videos", videosRoutes);
app.use("/testimonial", testimonialRoutes);
app.use("/contact", contactRoutes);
app.use("/emailViaForm", emailViaFormRoutes);
app.use("/chatbot", chatbotRoutes);
//error handling
app.use((req, res, next) => {
  const error = new Error("Not Found !");
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
