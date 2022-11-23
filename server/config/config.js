const config = {
  HOST: "http://localhost:5000",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  CIPHER_ALGORITHM: "aes256",
  CIPHER_KEY: "31f7d2ab737c05bfcb95f6a95e8a0ec5", // it's random key = crypto.randomBytes(16).toString("hex");
};

module.exports = { config };
