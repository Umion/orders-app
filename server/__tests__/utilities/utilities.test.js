const { config } = require("../../config/config");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  imageDownloader,
  encrypt,
  decrypt,
  pad2,
  getTimestamp,
  formatDate,
} = require("../../utilities/utilities");
const { emptyDir, readdir } = require("fs-extra");

describe("utilities tests", () => {
  it("test generation Access Token", () => {
    const data = {
      id: "5",
      email: "test@amoniac.eu",
    };
    const token = generateAccessToken(data.id, data.email);
    const decodedData = jwt.verify(token, config.JWT_SECRET_KEY);
    expect(decodedData.id).toEqual(data.id);
    expect(decodedData.email).toEqual(data.email);
  });

  it("test encrypt / decrypt", () => {
    const string = "lorem ipsum";

    const encryptData = encrypt(string);
    expect(encryptData).toEqual(expect.any(String));

    const decryptData = decrypt(encryptData);
    expect(decryptData).toEqual(string);
  });

  it("test encrypt / decrypt", () => {
    const string = "lorem ipsum";

    const encryptData = encrypt(string);
    expect(encryptData).toEqual(expect.any(String));

    const decryptData = decrypt(encryptData);
    expect(decryptData).toEqual(string);
  });

  it("test time formatter", () => {
    const res1 = pad2(1);
    const res2 = pad2(10);
    const res3 = pad2(0);

    expect(res1).toEqual("01");
    expect(res2).toEqual("10");
    expect(res3).toEqual("00");
  });

  it("test getTimestamp", () => {
    const res = getTimestamp();
    expect(res).toEqual(expect.any(String));
  });

  it("test formatDate", () => {
    const date = "2022-10-18T10:13:48.638Z";
    const res = formatDate(date);
    expect(res).toEqual("20221018");
  });

  it("test image downloader", async () => {
    await emptyDir(config.IMAGE_FOLDER);
    const urls = [
      "https://d26pm0riky5t4b.cloudfront.net/post/top_image/e5197b37-fa17-4463-930a-257282ad20b6.jpg",
      "https://d26pm0riky5t4b.cloudfront.net/post/top_image/af2c9ae5-8cb8-482b-a213-2b9d01963291.jpg",
    ];

    await imageDownloader(urls);

    const images = await readdir(config.IMAGE_FOLDER);
    expect(images.length).toEqual(2);
  });
});
