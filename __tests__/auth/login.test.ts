import { delay } from "@goodtechsoft/xs-micro-service";
import request from "supertest";
import { IMock, init } from "../../src/mocks";

let mock: IMock | undefined;

beforeAll(async () => {
  console.log("Before all.");
  mock = await init();
});

afterAll(async () => {
  console.log("After all.");
  await mock?.clear();
});
let accessToken = "";

describe("POST /app/auth/login", () => {
  it("User login [phone]", async () => {
    const response = await request(mock?.app)
      .post("/app/auth/login")
      // .set("Authorization", `Bearer ${mock?.accessToken}`)
      .send({ 
        username: "94950976",
        password: "1234"
      });

    await delay(300);
    
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();

    accessToken = response.body.accessToken;

    console.log(response.body);
  });
});