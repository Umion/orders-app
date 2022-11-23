const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const bcrypt = require("bcryptjs");

const generateAccessToken = (id, email) => {
  const payload = { id, email };
  return jwt.sign(payload, config.JWT_SECRET_KEY);
};

const hashPassword = (password) => bcrypt.hashSync(password, 7);
const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);

module.exports = {
  generateAccessToken,
  hashPassword,
  comparePassword,
};
