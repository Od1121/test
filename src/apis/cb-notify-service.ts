import { Micro } from "@goodtechsoft/xs-micro-service";
import config from "../config/apis";

const api = Micro.api(config["de-notify-service"]);

export const NotifyService = {
  send: (data: unknown) => api.fetch("/email/send", data)
};