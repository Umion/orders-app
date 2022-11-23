const { User } = require("../models/models");
const {
  hashPassword,
  comparePassword,
  generateAccessToken,
} = require("../utilities/utilities");

class authController {
  async registry(req, res) {
    try {
      const { name, email, password } = req.body;

      const candidate = await User.findOne({ where: { email } });
      if (candidate?.id) {
        return res
          .status(400)
          .json({ message: "User with this email is already exist" });
      }
      const hash = hashPassword(password);
      await User.create({ name, email, password: hash });

      return res.json({
        status: true,
        message: "User has been successfully created",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Registration error" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res
          .status(400)
          .json({ message: "User with this email is not exist" });
      }
      const validPassword = comparePassword(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Password is not correct" });
      }

      const token = generateAccessToken(user.id, user.email);
      return res.json({ token });
    } catch (error) {}
  }

  async getUser(req, res) {
    try {
      const { id } = req.user;

      const user = await User.findByPk(id);
      if (user.id) {
        return res.json({
          id: user.id,
          name: user.name,
          email: user.email,
        });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  }
}

module.exports = new authController();
