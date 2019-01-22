import request from "supertest";
import assert from "assert";
import { app as app_authenticate, router as router_authenticate } from "./authentication";
import { app as app_authorization, router as router_authorization } from "./authorization";

describe("Check token authorization", () => {
  before(async () => {
    app_authenticate.use(router_authenticate());
    app_authorization.use(router_authorization());
  });

  it("Verify jwt", async () => {
    const response = await request(app_authenticate)
      .post("/authentication")
      .send({
        clientID: "some_id",
        secret: "some_secret"
      })
      .expect("content-type", /json/)
      .expect(201)

    assert(response.body.access_token);

    const response_authorization = await request(app_authorization)
      .get("/authorization")
      .set("Authorization", `Bearer ${response.body.access_token}`)
      .expect("content-type", /json/)
      .expect(200)

    assert.deepEqual(response_authorization.body, "Access is allowed");
  })
});