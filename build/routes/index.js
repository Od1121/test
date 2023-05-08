"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const xs_micro_service_1 = require("@goodtechsoft/xs-micro-service");
const express_1 = require("express");
const SESSION_SCOPE_1 = require("../constants/SESSION_SCOPE");
const auth_1 = require("../middlewares/auth");
const sign_1 = require("../middlewares/sign");
const routes = () => {
    const router = (0, express_1.Router)();
    router.use("/2fa/auth", [(0, sign_1.sign)(SESSION_SCOPE_1.SESSION_SCOPE.NONE), (0, xs_micro_service_1.Routes)(__dirname, [
            "/api/auth/verify",
            "/api/auth/login",
            "/api/auth/refresh-token"
        ])]);
    router.use("/2fa/auth", [(0, sign_1.sign)(SESSION_SCOPE_1.SESSION_SCOPE.FORGOT), auth_1.auth, (0, xs_micro_service_1.Routes)(__dirname, [
            "/api/otp/get",
            "/api/otp/verify"
        ])]);
    router.use("/2fa/auth", [(0, sign_1.sign)(SESSION_SCOPE_1.SESSION_SCOPE.CHANGE_PASSWORD), auth_1.auth, (0, xs_micro_service_1.Routes)(__dirname, [
            "/api/password/change"
        ])]);
    router.use("/2fa/auth", [(0, sign_1.sign)(SESSION_SCOPE_1.SESSION_SCOPE.AUTHORIZED), auth_1.auth, (0, xs_micro_service_1.Routes)(__dirname, "/api")]);
    return router;
};
exports.routes = routes;
