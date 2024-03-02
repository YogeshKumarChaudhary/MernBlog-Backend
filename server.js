const express = require("express");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db");
const app = express();
const port = process.env.PORT || 5000;
const path = require("path");

app.use(
  cors({
    origin: "https://blogapp-yogesh.netlify.app",
    // origin:"http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", userRoutes);
app.use("/uploads", express.static(path.join(__dirname + "uploads")));

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
