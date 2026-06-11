const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

  const userAlreadyExists = await userModel.findOne({ email });

  if (userAlreadyExists) {
    return res.status(409).json({
      message: "user already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user registered successfully",
    user:{
      id:user.
      username:user.username,
      email:user.email
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const userExist = await userModel.findOne({ email });

  if (!userExist) {
    return res.status(400).json({
      message: "enter correct email and password",
    });
  }

  const isMatch = await bcrypt.compare(password, userExist.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password or email",
    });
  }

  const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET);

  res.cookie("token", token);

  return res.status(200).json({ message: "Login successful" });
}

module.exports = { registerUser, loginUser };
