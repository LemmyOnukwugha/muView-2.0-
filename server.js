const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const fileUpload = require("express-fileupload");
const reviewRoutes = require("./routes/review");
const albumRoutes = require("./routes/album");
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();
// Connect to db after the dotenv above
require("./config/database");

const app = express();

app.use(logger("dev"));
app.use(express.json());

// app.use(favicon(path.join(__dirname, "build", "favicon.ico")))
app.use(express.static(path.join(__dirname, "build")));
app.use(express.static(path.join(__dirname, "public")));

app.use(fileUpload());

// Put all API routes here (before the catch-all)
app.use("/api/reviews", reviewRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/auth", authRoutes);

// "catch-all" route that will match all GET requests
// that don't match an API route defined above
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// error middleware
app.use(errorHandler);

const port = process.env.PORT || 3002;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
