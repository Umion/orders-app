const request = require("supertest");
const app = require("../../app");
const { User, Company } = require("../../models/models");
const { ordersQueue } = require("../../utilities/queues");
const { generateAccessToken, encrypt } = require("../../utilities/utilities");

describe("CompanyController api", () => {
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

  describe("create Company", () => {
    const company = {
      name: "Lorem OU",
      integration: "MeritActiva",
      integrationKey: "00000000",
      integrationId: "111111111",
    };

    it("should create company", async () => {
      const res = await request(app)
        .post("/api/company/create")
        .send(company)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.id).toBeDefined();
      expect(res.body.name).toEqual(company.name);
      expect(res.body.integration).toEqual(company.integration);
    });

    it("should return 400", async () => {
      const company = {
        name: "Lorem2 OU",
        integration: "MeritActiva",
        integrationKey: "00000000",
      };
      const res = await request(app)
        .post("/api/company/create")
        .send(company)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("Fill in all the fields");
    });

    it("should return 403", async () => {
      const res = await request(app).post("/api/company/create").send(company);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User unauthorized");
    });
  });

  describe("delete Company", () => {
    const company1 = {
      name: "Lorem OU",
      integration: "MeritActiva",
      integrationKey: "00000000",
      integrationId: "111111111",
    };
    const company2 = {
      name: "Company OU",
      integration: "MeritActiva",
      integrationKey: "222222222",
      integrationId: "333333333",
    };

    let id, id2;

    beforeAll(async () => {
      await User.destroy({
        where: {},
        cascade: true,
      });
      const res = await User.create(user);
      token = generateAccessToken(res.dataValues.id, res.dataValues.email);

      const res_company = await Company.create({
        name: company1.name,
        integration: company1.integration,
        integrationKey: encrypt(company1.integrationKey.toString()),
        integrationId: encrypt(company1.integrationId.toString()),
        userId: res.dataValues.id,
      });
      const res_company2 = await Company.create({
        name: company2.name,
        integration: company2.integration,
        integrationKey: encrypt(company2.integrationKey.toString()),
        integrationId: encrypt(company2.integrationId.toString()),
        userId: res.dataValues.id,
      });

      id = res_company.id;
      id2 = res_company2.id;
    });

    it("should delete company", async () => {
      const res = await request(app)
        .post("/api/company/delete")
        .send({ ids: [id] })
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body).toEqual(true);
    });

    it("shouldn't find company", async () => {
      const res = await Company.findByPk(id);

      expect(res).toEqual(null);
    });

    it("should return 400", async () => {
      const res = await request(app)
        .post("/api/company/delete")
        .send(null)
        .set("Authorization", `Bearer ${token}`);
      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("Invalid data");

      const res2 = await request(app)
        .post("/api/company/delete")
        .send([])
        .set("Authorization", `Bearer ${token}`);
      expect(res2.statusCode).toEqual(400);
      expect(res2.body).toBeDefined();
      expect(res2.body.message).toEqual("Invalid data");
    });

    it("should return 403", async () => {
      const res = await request(app).post("/api/company/delete").send([id2]);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User unauthorized");
    });
  });
});
