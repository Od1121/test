
import { argv } from "@goodtechsoft/xs-micro-service";
import { Server } from "http";
import { config } from "./config";
import { App } from "./core";
import sequelize from "./core/sequelize";

export let http: Server;


export const server = async (supertest = false) => {
  try {
    console.time(`>>> ${config.server.name} >>>`);
    await sequelize.connect();
    console.log("[postgres] connection successful.");
  


    const app = await App();
    
    if (!supertest) {
      http = new Server(app);
      http.listen(config.server.port, async () => {
        console.log(`[http] server ${config.server.port} is listening ...`);
      });
    }
    return app;
  } catch (err) {
    console.log(err);
  }
};

if (process.env.NODE_ENV !== "test")
  server();