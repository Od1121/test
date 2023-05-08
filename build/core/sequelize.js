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
exports.nextSequence = exports.startTransaction = exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const config_1 = require("../config");
const path_1 = __importDefault(require("path"));
exports.sequelize = new sequelize_typescript_1.Sequelize({
    host: config_1.config.database.host,
    port: config_1.config.database.port,
    database: config_1.config.database.database,
    dialect: config_1.config.database.dialect,
    username: config_1.config.database.username,
    password: config_1.config.database.password,
    models: [path_1.default.join(__dirname, "/../models/*.js")],
});
exports.default = {
    connect: () => __awaiter(void 0, void 0, void 0, function* () {
        yield exports.sequelize.authenticate();
    })
};
const startTransaction = (callback) => __awaiter(void 0, void 0, void 0, function* () {
    const t = yield exports.sequelize.transaction();
    const commit = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield t.commit();
    });
    const rollback = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield t.rollback();
    });
    return callback(commit, rollback, t);
});
exports.startTransaction = startTransaction;
const nextSequence = (name, prefix, MIN_VALUE = 100000) => __awaiter(void 0, void 0, void 0, function* () {
    const sequence = `NEXT_${name}_SEQ`;
    const nextVal = () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield exports.sequelize.query(`SELECT nextval('${sequence}');`);
        if (!(result && result[0] && result[0][0] && result[0][0].nextval))
            throw new Error("SEQUENCE_NEXVAL_ERROR");
        return prefix ? prefix + result[0][0].nextval : result[0][0].nextval;
    });
    return nextVal()
        .catch(() => {
        return exports.sequelize.query(`CREATE SEQUENCE ${sequence} START ${MIN_VALUE};`)
            .then(() => nextVal());
    });
});
exports.nextSequence = nextSequence;
