const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateAuthToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const generateVerificationToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

module.exports = { generateAuthToken, generateVerificationToken };
