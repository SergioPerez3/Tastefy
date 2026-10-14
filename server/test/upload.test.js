import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";

const EMAIL = "upload-user@test.com";

describe("Upload", function () {
  let token;

  before(async () => {
    await User.deleteMany({ email: EMAIL });

    await request(app)
      .post("/auth/register")
      .send({ name: "Uploader", email: EMAIL, password: "123456" });

    const response = await request(app)
      .post("/auth/login")
      .send({ email: EMAIL, password: "123456" });

    token = response.body.token;
  });

  after(async () => {
    await User.deleteMany({ email: EMAIL });
  });

  it("debería devolver 401 sin token", async () => {
    const response = await request(app).post("/upload");

    expect(response.status).to.equal(401);
  });

  it("debería devolver 400 si no se envía imagen", async () => {
    const response = await request(app)
      .post("/upload")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).to.equal(400);
  });

  it("debería rechazar archivos que no son imagen", async () => {
    const response = await request(app)
      .post("/upload")
      .set("Authorization", `Bearer ${token}`)
      .attach("image", Buffer.from("hola"), {
        filename: "nota.txt",
        contentType: "text/plain",
      });

    expect(response.status).to.equal(400);
  });
});