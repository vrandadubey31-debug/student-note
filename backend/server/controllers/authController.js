const User = require("../models/User");
const {
  generateAuthToken,
  generateVerificationToken,
} = require("../utils/generateToken");
const sendVerificationEmail = require("../utils/sendEmail");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide name, email and password" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists" });
    }

    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = Date.now() + 60 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpiry,
    });

    try {
      await sendVerificationEmail(user.email, user.name, verificationToken);
    } catch (emailError) {
      await User.findByIdAndDelete(user._id);
      console.error(`Failed to send verification email: ${emailError.message}`);
      return res.status(500).json({
        message:
          "Account created but the verification email could not be sent. Please try registering again.",
      });
    }

    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Verification token is missing" });
    }

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or already used verification token" });
    }

    if (
      !user.verificationTokenExpiry ||
      user.verificationTokenExpiry < Date.now()
    ) {
      user.verificationToken = undefined;
      user.verificationTokenExpiry = undefined;
      await user.save();

      return res.status(400).json({
        message:
          "Verification token has expired. Please register again to receive a new link.",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now log in." });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        message: "Please verify your email address before logging in",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateAuthToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, verifyEmail, login };
