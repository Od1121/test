"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyService = void 0;
const xs_micro_service_1 = require("@goodtechsoft/xs-micro-service");
const apis_1 = __importDefault(require("../config/apis"));
const api = xs_micro_service_1.Micro.api(apis_1.default["de-notify-service"]);
exports.NotifyService = {
    send: (data) => api.fetch("/email/send", data)
};
