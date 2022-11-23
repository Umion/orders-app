const request = require("supertest");
const app = require("../../app");
const { User, Company, Report } = require("../../models/models");
const { ordersQueue, createJob } = require("../../utilities/queues");
const { generateAccessToken, encrypt } = require("../../utilities/utilities");

// jest.mock("../../utilities/queues");
// createJob.mockImplementation(() => null);

describe("ReportController api", () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "John.Doe@amoniac.eu",
  };
  const company = {
    name: "Lorem OU",
    integration: "MeritActiva",
    integrationKey: "00000000",
    integrationId: "111111111",
  };
  let token, companyId;

  beforeAll(async () => {
    await User.destroy({
      where: {},
      cascade: true,
      truncate: true,
    });

    const res = await User.create(user);
    const res_company = await Company.create({
      name: company.name,
      integration: company.integration,
      integrationKey: encrypt(company.integrationKey.toString()),
      integrationId: encrypt(company.integrationId.toString()),
      userId: res.dataValues.id,
    });
    companyId = res_company.dataValues.id;
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

  describe("create Report", () => {
    it("should create Report", async () => {
      const reportData = {
        supplier: "Rimi",
        currency: "EUR",
        amount: "123",
        images: ["img_name_1.png", "img_name_2.png"],
        date: new Date().toString(),
        companyId,
      };

      const res = await request(app)
        .post("/api/report/create")
        .send(reportData)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(true);

      const company = await Company.findByPk(companyId, {
        include: [Report],
      });

      expect(company.dataValues.reports).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            supplier: reportData.supplier,
            currency: reportData.currency,
            amount: reportData.amount,
            date: reportData.date,
          }),
        ])
      );
    });

    it("should return 400", async () => {
      const dataWithoutSupplier = {
        currency: "EUR",
        amount: "123",
        images: ["img_name_1.png", "img_name_2.png"],
        date: new Date().toString(),
        companyId,
      };
      const dataWithoutAmount = {
        supplier: "Rimi",
        currency: "EUR",
        images: ["img_name_1.png", "img_name_2.png"],
        date: new Date().toString(),
        companyId,
      };
      const dataWithoutId = {
        supplier: "Rimi",
        currency: "EUR",
        amount: "123",
        images: ["img_name_1.png", "img_name_2.png"],
        date: new Date().toString(),
      };

      const res_1 = await request(app)
        .post("/api/report/create")
        .send(dataWithoutSupplier)
        .set("Authorization", `Bearer ${token}`);
      expect(res_1.statusCode).toEqual(400);
      expect(res_1.body).toBeDefined();
      expect(res_1.body.message).toEqual("Fill in all the fields");

      const res_2 = await request(app)
        .post("/api/report/create")
        .send(dataWithoutAmount)
        .set("Authorization", `Bearer ${token}`);
      expect(res_2.statusCode).toEqual(400);
      expect(res_2.body).toBeDefined();
      expect(res_2.body.message).toEqual("Fill in all the fields");

      const res_3 = await request(app)
        .post("/api/report/create")
        .send(dataWithoutId)
        .set("Authorization", `Bearer ${token}`);
      expect(res_3.statusCode).toEqual(400);
      expect(res_3.body).toBeDefined();
      expect(res_3.body.message).toEqual("Fill in all the fields");
    });

    it("should return 403", async () => {
      const reportData = {
        supplier: "Rimi",
        currency: "EUR",
        amount: "123",
        images: ["img_name_1.png", "img_name_2.png"],
        date: new Date().toString(),
        companyId,
      };
      const res = await request(app)
        .post("/api/report/create")
        .send(reportData);
      expect(res.statusCode).toEqual(403);
      expect(res.body).toBeDefined();
      expect(res.body.message).toEqual("User unauthorized");
    });
  });

  describe("generate link for Report images", () => {
    it("should geneerate links", async () => {
      const images = [
        {
          filename: "10D5FC7E-5AF1-444C-ACCF-A713E55C5EC3.jpg",
          type: "image/jpg",
          path: "file:///Users/A713E55C5EC3.jpg",
        },
      ];
      const res = await request(app)
        .post("/api/report/generate_link")
        .send(images)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeDefined();
      expect(res.body.data).toBeDefined();
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            ...images[0],
            filename: expect.any(String),
            link: expect.any(String),
          }),
        ])
      );
    });

    it("should return 400", async () => {
      const images = [];
      const res = await request(app)
        .post("/api/report/generate_link")
        .send(images)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeDefined();
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toEqual("Incorrect data");
    });

    it("should return 400", async () => {
      const images = {};
      const res = await request(app)
        .post("/api/report/generate_link")
        .send(images)
        .set("Authorization", `Bearer ${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toBeDefined();
      expect(res.body.message).toBeDefined();
      expect(res.body.message).toEqual("Incorrect data");
    });
  });
});
