const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const sendOtp = require("../services/email.service");

async function registerUser(req, res) {
  try {
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
      {
        expiresIn: '7d'
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const userExist = await userModel.findOne({ email });

  if (!userExist) {
    return res.status(400).json({
      message: "enter correct email",
    });
  }

  const isMatch = await bcrypt.compare(password, userExist.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({ message: "Login successful" });
}

async function logoutUser(req, res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res.status(200).json({
    message: "Logout successful",
  });
}

async function forgotpassword(req, res) {
  try {
    const { email } = req.body;

    const userExist = await userModel.findOne({ email })

    if (!userExist) {
      return res.status(404).json({ message: "user not found" })
    }

    const OTP = Math.floor(100000 + Math.random() * 900000).toString();

    const hashedOtp = await bcrypt.hash(OTP, 10);

    userExist.otp = hashedOtp;
    const expiry = new Date(Date.now() + 10 * 60 * 1000)
    userExist.otpExpiry = expiry

    await userExist.save()

    await sendOtp(userExist.email, OTP)

    return res.status(200).json({ message: "otp sent", email })
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ message: err.message })
  }


}

async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email })

    const verification = await bcrypt.compare(otp, user.otp)

    if (verification) {
      return res.status(200).json({ message: "otp verified" })
    } else {
      return res.status(400).json({ message: "otp is not matched" })
    }

  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

async function resetPassword(req, res) {
  try {
    const { email, password } = req.body


    const user = await userModel.findOne({ email })
    const hashedPassword = await bcrypt.hash(password, 10)
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;

    await user.save();

    return res.status(200).json({ message: "password changed!!" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = { registerUser, loginUser, logoutUser, forgotpassword, verifyOtp, resetPassword };
