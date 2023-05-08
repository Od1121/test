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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const express_session_1 = __importDefault(require("express-session"));
const headers_1 = require("./headers");
const config_1 = require("../config");
const routes_1 = require("../routes");
const express_useragent_1 = __importDefault(require("express-useragent"));
const xs_micro_service_1 = require("@goodtechsoft/xs-micro-service");
const App = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(headers_1.accessControl);
    app.use(express_useragent_1.default.express());
    app.use((0, cookie_parser_1.default)(config_1.config.server.name + ".ckp"));
    app.use((0, morgan_1.default)("dev"));
    app.use(body_parser_1.default.json({ limit: "50mb" }));
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use((0, express_session_1.default)({
        name: config_1.config.server.name + ".sid",
        secret: config_1.config.server.name + ".scr",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        resave: true,
        saveUninitialized: true
    }));
    app.use((0, routes_1.routes)());
    app.use((0, xs_micro_service_1.errorHandler)());
    return app;
});
exports.App = App;
