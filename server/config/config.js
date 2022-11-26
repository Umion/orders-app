require("dotenv").config();

const config = {
  HOST: "http://localhost:5000",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

module.exports = { config };
