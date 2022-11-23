const request = require("supertest");
const app = require("../../app");
const UserController = require("../../controllers/UserController");
const { User } = require("../../models/models");
const { ordersQueue } = require("../../utilities/queues");
const { generateAccessToken } = require("../../utilities/utilities");

describe("UserController api", () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "John.Doe@amoniac.eu",
  };
  let token;

  beforeAll(async () => {
    await User.destroy({
      where: {},
      cascade: true,
      truncate: true,
    });
    const res = await User.create(user);
    token = generateAccessToken(res.dataValues.id, res.dataValues.email);
  });

  afterAll(async () => {
    await User.destroy({
      where: {},
      cascade: true,
      truncate: true,
    });
    ordersQueue.close();
  });

  describe("create user", () => {
    const customUser = {
      firstName: "Jane",
      lastName: "Rout",
      email: "Jane.Rout@amoniac.eu",
    };

    it("should create user", async () => {
      const res = await UserController.create(customUser);
      expect(res.dataValues).toBeDefined();
      expect(res.dataValues.id).toBeDefined();
      expect(res.dataValues.email).toEqual(customUser.email);
      expect(res.dataValues.firstName).toEqual(customUser.firstName);
      expect(res.dataValues.lastName).toEqual(customUser.lastName);
    });
  });

  describe("get user", () => {
    it("should return user", async () => {
      const res = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.email).toEqual(user.email);
      expect(res.body.firstName).toEqual(user.firstName);
      expect(res.body.lastName).toEqual(user.lastName);
    });

    it("should return 404", async () => {
      const incorrectToken = generateAccessToken(0, "incorrect@amoniac.eu");
      const res = await request(app)
        .get("/api/user")
        .set("Authorization", `Bearer ${incorrectToken}`);
      expect(res.statusCode).toEqual(404);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User not found");
    });

    it("should return 403", async () => {
      const res = await request(app).get("/api/user");
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User unauthorized");
    });
  });

  describe("update user", () => {
    const updatedUser = {
      firstName: "John",
      lastName: "Doe",
    };

    it("should return updated user", async () => {
      const res = await request(app)
        .post("/api/user/update")
        .send(updatedUser)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.email).toEqual(user.email);
      expect(res.body.firstName).toEqual(updatedUser.firstName);
      expect(res.body.lastName).toEqual(updatedUser.lastName);
    });
  });
});
