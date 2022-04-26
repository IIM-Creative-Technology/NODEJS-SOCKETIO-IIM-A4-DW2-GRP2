const express = require("express");
const request = require("supertest");
const app = express();
const router = require("../routes/router");
app.use("/", router);

test("test if get request on '/' respond Hello World!", async () => {
  const res = await request(app).get("/");
  expect(res.statusCode).toBe(200);
  expect(res.text).toBe("Hello world !");
});
