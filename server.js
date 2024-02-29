const express = require("express");
const userRoutes = require("./routes/userRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
require("./db");
const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://mernblogappbyyogesh.netlify.app",
  methods: "GET,POST,PUT,DELETE,PATCH,",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`App is listening on Port ${port}`);
});
