const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const userRoutes = require("./app/modules/user/user.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
// app.use("/api/v1/category", CategoryRoutes);
// app.use("/api/v1/post", PostRoutes);

// Root Route
app.get("/", (req, res) => {
      res.send(`Welcome to Office meal management system server`);
});

app.use((req, res) => {
      res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'Not Found',
            errorMessage: {
                  path: req.originalUrl,
                  message: 'Not Found',
            },
      });
});

module.exports = app