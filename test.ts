import request from "supertest";
import assert from "assert";
import { app, router } from "./authentication";

describe("Check token authorization", () => {
  before(async () => {
    app.use(router());
  });

  it("Verify jwt when passed valid secret", async () => {
    const response = await request(app)
      .post("/authentication")
      .send({
        clientID: "some_id",
        secret: "some_secret"
      })
      .expect("content-type", /json/)
      .expect(200)

    assert.deepEqual(response.body, "Private info");
  })

  it("Verify jwt when passed not valid secret", async () => {
    const response = await request(app)
      .post("/authentication")
      .send({
        clientID: "some_id",
        secret: "not_valid_secret"
      })
      .expect("content-type", /json/)
      .expect(401)

    assert.deepEqual(response.body, "Unauthorized");
  })
});