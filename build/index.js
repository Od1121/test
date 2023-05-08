"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.http = void 0;
const http_1 = require("http");
const config_1 = require("./config");
const core_1 = require("./core");
const sequelize_1 = __importDefault(require("./core/sequelize"));
const server = (supertest = false) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.time(`>>> ${config_1.config.server.name} >>>`);
        yield sequelize_1.default.connect();
        console.log("[postgres] connection successful.");
        const app = yield (0, core_1.App)();
        if (!supertest) {
            exports.http = new http_1.Server(app);
            exports.http.listen(config_1.config.server.port, () => __awaiter(void 0, void 0, void 0, function* () {
                console.log(`[http] server ${config_1.config.server.port} is listening ...`);
            }));
        }
        return app;
    }
    catch (err) {
        console.log(err);
    }
});
exports.server = server;
if (process.env.NODE_ENV !== "test")
    (0, exports.server)();
