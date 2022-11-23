const axios = require("axios");
const { integration } = require("../../utilities/merit");

jest.mock("axios");
axios.post.mockImplementation(() => {
  return { status: 200, statusText: "OK" };
});

describe("Integration test", () => {
  it("should return status 200", async () => {
    const res = await integration("null", { lorem: "ipsum" });
    expect(res).toEqual({ status: 200, statusText: "OK" });
  });
});
