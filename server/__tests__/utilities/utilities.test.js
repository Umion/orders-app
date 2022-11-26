const { config } = require("../../config/config");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  hashPassword,
  comparePassword,
} = require("../../utilities/utilities");

describe("utilities tests", () => {
  it("test generation Access Token", () => {
    const data = {
      id: "5",
      email: "test@gmail.eu",
    };
    const token = generateAccessToken(data.id, data.email);
    const decodedData = jwt.verify(token, config.JWT_SECRET_KEY);

    expect(decodedData.id).toEqual(data.id);
    expect(decodedData.email).toEqual(data.email);
  });

  it("test hashPassword", () => {
    const string = "loremipsum";

    const hashData = hashPassword(string);
    expect(hashData).toEqual(expect.any(String));
  });

  it("test comparePassword", () => {
    const password1 = "lorem1";
    const password2 = "lorem2";
    const password3 = "lorem1";

    const res = comparePassword(password1, hashPassword(password2));
    expect(res).toEqual(false);

    const res2 = comparePassword(password1, hashPassword(password3));
    expect(res2).toEqual(true);
  });
});
