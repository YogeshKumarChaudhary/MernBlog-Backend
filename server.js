const express = require("express");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db");
const app = express();
const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "https://blogapp-yogesh.netlify.app",
//     // origin:"http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     credentials: true,
//   })
// );
app.use(
  cors({
    origin: "https://onlylbc.com",
    credentials: true, // Allow credentials to be included
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
