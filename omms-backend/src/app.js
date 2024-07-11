const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const userRoutes = require("./app/modules/user/user.route");
const mealCategoryRoutes = require("./app/modules/mealCategory/mealCategory.route");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/meal-category", mealCategoryRoutes);

// Root Route
app.get("/", (req, res) => {
      res.send(`Welcome to Office meal management system server`);
});

// Error Handler
app.use(globalErrorHandler);

// Route not found error response
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