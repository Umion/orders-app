const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "User unauthorized" });
      }

      const decodedData = jwt.verify(token, config.JWT_SECRET_KEY);
      req.user = decodedData;
      next();
    } else {
      return res.status(401).json({ message: "User unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "User unauthorized" });
  }
};
