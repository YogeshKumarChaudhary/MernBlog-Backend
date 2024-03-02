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
// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.get("/profile", profile);
userRoutes.post("/logout", logout);
userRoutes.post("/post", upload.single("file"), postCreate);
userRoutes.get("/post", getAllPost);
userRoutes.get("/post/:id", getPostDetails);
userRoutes.put("/post", upload.single("file"), updatePost);
userRoutes.delete("/post/:id", deletePost);

module.exports = userRoutes;
