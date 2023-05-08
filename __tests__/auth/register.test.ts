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
let otpMethod = "";
let otpCode = "";

describe("POST /app/auth/register", () => {
  it("Register user [phone]", async () => {
    const response = await request(mock?.app)
      .post("/app/auth/register")
      // .set("Authorization", `Bearer ${mock?.accessToken}`)
      .send({ 
        phone: "88879595"
      });

    await delay(300);
    
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();

    accessToken = response.body.accessToken;
  });
});

describe("POST /app/otp/get", () => {
  it("Get otp [phone]", async () => {
    const response = await request(mock?.app)
      .get("/app/otp?otpMethod=REGISTER")
      .set("Authorization", `Bearer ${accessToken}`)
      .send();

    await delay(300);
    
    expect(response.status).toBe(200);

    otpMethod = response.body.otpMethod;
    otpCode = response.body.otpCode;
  });
});

describe("POST /app/otp/verify", () => {
  it("Get verify [phone]", async () => {
    const response = await request(mock?.app)
      .post("/app/otp/verify")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ 
        otpMethod: otpMethod,
        otpCode  : otpCode
      });

    await delay(300);
    
    expect(response.status).toBe(200);

    console.log(response.body);

    accessToken = response.body.accessToken;
  });
});

describe("POST /app/password/change", () => {
  it("Change password [otp code]]", async () => {
    const response = await request(mock?.app)
      .post("/app/user/change_password")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({ 
        password: "1234"
      });

    await delay(300);
    
    expect(response.status).toBe(200);

    console.log(response.body);
  });
});