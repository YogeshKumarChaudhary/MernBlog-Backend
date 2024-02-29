const express = require("express");
const {
  register,
  login,
  profile,
  logout,
  postCreate,
  getAllPost,
  getPostDetails,
  updatePost,
  deletePost,
} = require("../controllers/userController");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/profile", profile);
userRoutes.post("/logout", logout);
userRoutes.post("/post", uploadMiddleware.single("file"), postCreate);
userRoutes.get("/post", getAllPost);
userRoutes.get("/post/:id", getPostDetails);
userRoutes.put("/post", uploadMiddleware.single("file"), updatePost);
userRoutes.delete("/post/:id", deletePost);

module.exports = userRoutes;