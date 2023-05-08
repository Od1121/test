"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configure_1 = require("@goodtechsoft/xs-micro-service/build/lib/configure");
exports.default = (0, configure_1.Configure)(({ HOST, PORT }) => ({
    "de-notify-service": {
        VERSION: "v1",
        HOST: HOST || `http://de-notify-service.${process.env.NAMESPACE}`,
        PORT: PORT || 30555,
        API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZGUtbm90aWZ5LXNlcnZpY2UifQ.IhTwMNY4WoCGc9nRYzJEzqR2_qZJmrsOjmKC52kPP8Y"
    }
}), {
    development: {
        HOST: "http://127.0.0.1"
    },
    dev: {
        PORT: 80
    }
});
