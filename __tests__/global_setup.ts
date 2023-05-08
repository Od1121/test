import { server } from "../src";

export default async () => {
  console.log("global setup");

  await server(true);
};