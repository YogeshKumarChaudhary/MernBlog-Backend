const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie");
const fs = require("fs");
const Post = require("../models/postModel");

const secretKey = "yogejseojdskjakhreej8493ajknjay238439oajfjlkf";

const register = async (req, res) => {
  const hashPassword = await bcrypt.hash(req.body.password, 10);
  try {
    const user = await User({
      username: req.body.username,
      password: hashPassword,
    }).save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(404)
        .json({ message: "Username and Password both are Required" });
    }

    const findUser = await User.findOne({ username });
    if (!findUser) {
      return res.status(404).json({ message: "User Not found" });
    }

    const checkPassword = await bcrypt.compare(password, findUser.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Wrong Credencials!" });
    }

    const token = await jwt.sign({ username, id: findUser._id }, secretKey);

    res
      .cookie("token", token)
      .status(200)
      .json({ token: token, id: findUser._id, username });
  } catch (error) {
    console.log(error);
  }
};

const profile = async (req, res) => {
  const { token } = req.cookies;
  //   console.log(token);
  if (token) {
    const userData = jwt.verify(token, secretKey);
    if (!userData) {
      return res.status(401).json({ message: "Unauthrized !!" });
    }
    res.json(userData);
  }
};
const logout = async (req, res) => {
  res.clearCookie("token").json("Logout successful");
};

const postCreate = async (req, res) => {
  const { title, content, summary } = req.body;
  const { token } = req.cookies;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];

    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const userData = jwt.verify(token, secretKey);

    if (!userData) {
      return res.status(401).json({ message: "Unauthrized !!" });
    }
    const postDoc = await Post({
      title,
      summary,
      content,
      cover: newPath,
      author: userData.id,
    }).save();
    res.json(postDoc);
  }
};

// getAllPost
const getAllPost = async (req, res) => {
  const allPosts = await Post.find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20);
  res.json(allPosts);
};

// getPostDetails
const getPostDetails = async (req, res) => {
  const { id } = req.params;
  const postDetails = await Post.findById(id).populate("author", ["username"]);
  res.json(postDetails);
};

// updatePost
const updatePost = async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { title, content, summary, id } = req.body;
  const postDoc = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    {
      title,
      content,
      summary,
      cover: newPath ? newPath : postDoc.cover,
    },
    { new: true }
  );

  res.json({ updatedPost });
};

// deletePost
const deletePost = async (req, res) => {
  const { id } = req.params;
  const newData = await Post.findByIdAndDelete(id, { new: true });
  res.json({ newData });
};

module.exports = {
  register,
  login,
  profile,
  logout,
  postCreate,
  getAllPost,
  getPostDetails,
  updatePost,
  deletePost,
};
