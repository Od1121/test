import { http, kafka } from "../src";
import mongoose from "mongoose";
import { kafkaWrapper } from "@goodtechsoft/xs-broker";

export default async () => {
  console.log("global teardown");

  await mongoose.disconnect();
  console.log("[mongod] disconnected.");

  if (http) {
    await http.close();
    console.log("[http] server stopped.");
  }

  await kafkaWrapper.close();

  await kafka.close();
  console.log("[kafka] closed.");
};