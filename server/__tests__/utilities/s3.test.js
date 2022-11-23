require("dotenv").config();
const { getUrls } = require("../../utilities/s3");

describe("s3 tests", () => {
  it("test generation urls for uploading", async () => {
    const imageName = "photo_1.jpg";
    const data = await getUrls(imageName);
    expect(data).toEqual(expect.any(String));
  });
});
