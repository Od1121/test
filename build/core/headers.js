"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessControl = void 0;
const accessControl = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
};
exports.accessControl = accessControl;
