const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models/models");
const {
  generateAccessToken,
  hashPassword,
} = require("../../utilities/utilities");

describe("AuthController auth", () => {
  const user = {
    name: "John",
    email: "John.Doe@gmail.eu",
    password: hashPassword("password"),
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
  });

  describe("create user", () => {
    const customUser = {
      name: "Jane",
      email: "Jane.Rout@gmail.eu",
      password: "password",
    };

    it("should create user", async () => {
      const res = await request(app).post("/auth/registry").send(customUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.status).toBeDefined();
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toEqual("User has been successfully created");
    });
  });

  describe("login", () => {
    const customUser = {
      name: "John",
      email: "John.Doe@gmail.eu",
      password: "password",
    };

    const incorrectPasswordUser = {
      name: "John",
      email: "John.Doe@gmail.eu",
      password: "passwordw",
    };

    const incorrectEmailUser = {
      name: "John",
      email: "John.Doe@gmail2.eu",
      password: "password",
    };

    it("should login user", async () => {
      const res = await request(app).post("/auth/login").send(customUser);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.token).toEqual(expect.any(String));
    });

    it("should return 400 incorrect password", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send(incorrectPasswordUser);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("Password is not correct");
    });

    it("should return 403 incorrect email", async () => {
      const res = await request(app)
        .post("/auth/login")
        .send(incorrectEmailUser);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User with this email is not exist");
    });
  });

  describe("get user", () => {
    it("should return user", async () => {
      const res = await request(app)
        .get("/auth/user")
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.email).toEqual(user.email);
      expect(res.body.name).toEqual(user.name);
    });

    it("should return 403", async () => {
      const incorrectToken = generateAccessToken(0, "incorrect@gmail.eu");
      const res = await request(app)
        .get("/auth/user")
        .set("Authorization", `Bearer ${incorrectToken}`);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User with this email is not exist");
    });

    it("should return 403", async () => {
      const res = await request(app).get("/auth/user");
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User unauthorized");
    });
  });
});
