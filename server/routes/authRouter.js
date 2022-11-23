const Router = require("express");
const authController = require("../controllers/authController");
const authRouter = new Router();
const authMiddleware = require("../middlewares/authMiddleware");

//user
authRouter.post("/registry", authController.registry);
authRouter.post("/login", authController.login);
authRouter.get("/user", authMiddleware, authController.getUser);

module.exports = authRouter;
