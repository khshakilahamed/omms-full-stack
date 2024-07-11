
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1/user", UserRoutes);
// app.use("/api/v1/category", CategoryRoutes);
// app.use("/api/v1/post", PostRoutes);

// export default app;
module.exports=app