import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utlis/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchedPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//desc get user profile
//route Get api/users/profile
//access private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//desc get all user profile
//route Get api/users/profile
//access private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    return res.json(users);
  } else {
    res.status(404);
    throw new Error("Users not Found");
  }
});

//desc update user profile
//route Put api/users/profile
//access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.email = req.body.email || user.email;
    user.name = req.body.name || user.name;

    if (req.body.password) {
      user.password = req.body.password;
    }
    const updatedUser = await user.save();
    return res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const userToDelete = await User.findById(req.params.id);
  if (userToDelete) {
    await userToDelete.remove();
    res.json({ msg: "user removed successfully" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsers,
  deleteUser,
};
