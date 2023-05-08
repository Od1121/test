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
exports.auth = void 0;
const xs_micro_service_1 = require("@goodtechsoft/xs-micro-service");
const config_1 = require("../config");
const constants_1 = require("../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const header = `${req.headers.authorization}`;
    try {
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(header === null || header === void 0 ? void 0 : header.split(" ")[1], config_1.config.jwt.apiSecret);
            console.log(`🚀 ~ ${req.path} auth decoded`, decoded);
        }
        catch (err) {
            console.log(`🚀 ~ ${req.path} auth err`, err);
            throw new xs_micro_service_1.UnauthorizedError(constants_1.ERRORS.NO_CREDENTIALS);
        }
        const user = User_1.User.findOne({
            where: {
                id: decoded.uid
            }
        });
        if (!user)
            throw new xs_micro_service_1.UnauthorizedError(constants_1.ERRORS.NO_CREDENTIALS);
        if (user.sessionId !== decoded.sid)
            throw new xs_micro_service_1.UnauthorizedError(constants_1.ERRORS.NO_CREDENTIALS);
        req.user = user;
        req.sessionScope = decoded.scp;
        console.log(`🚀 ~ ${req.path} auth middleware done`);
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.auth = auth;
