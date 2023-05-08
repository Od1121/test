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
exports.sign = exports.signOut = exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const signIn = (res, { user, refreshToken, expiresIn, sessionId }, SESSION_SCOPE = "AUTHORIZED") => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = yield jsonwebtoken_1.default.sign({
        uid: user.id,
        sid: sessionId,
        scp: SESSION_SCOPE
    }, config_1.config.jwt.apiSecret, expiresIn ? { expiresIn: expiresIn } : {});
    // user.set({
    //   sessionScope: SESSION_SCOPE
    // });
    // await user.save();
    res.cookie(config_1.config.server.name + ".sec", accessToken, {
        expires: new Date((expiresIn || 1) * 1000),
        secure: false,
        httpOnly: true
    });
    res.json({
        userId: user.id,
        tokenType: "Bearer",
        accessToken: accessToken,
        refreshToken: refreshToken,
        sessionState: process.env.SERVER_ENV || "DEVELOPMENT"
        // sessionScope: SESSION_SCOPE
    });
});
exports.signIn = signIn;
const signOut = (res) => {
    res.clearCookie(config_1.config.server.name + ".sec");
    res.json({});
};
exports.signOut = signOut;
const sign = (scope) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { "device-token": deviceToken, "device-imei": deviceImei } = req.headers;
});
exports.sign = sign;
