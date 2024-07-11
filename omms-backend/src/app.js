const express = require("express");
const cors = require("cors");
const httpStatus = require("http-status");
const userRoutes = require("./app/modules/user/user.route");
const mealCategoryRoutes = require("./app/modules/mealCategory/mealCategory.route");
const mealItemRoutes = require("./app/modules/mealItems/mealItems.route");
const availableMealPerDayRoutes = require("./app/modules/availableMealPerDay/availableMealPerDay.route");
const authRoutes = require("./app/modules/auth/auth.route");
const orderRoutes = require("./app/modules/order/order.route");
const globalErrorHandler = require("./app/middlewares/globalErrorHandler");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/meal-category", mealCategoryRoutes);
app.use("/api/meal-item", mealItemRoutes);
app.use("/api/available-meal-per-day", availableMealPerDayRoutes);
app.use("/api/orders", orderRoutes);

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