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
const xs_micro_service_1 = require("@goodtechsoft/xs-micro-service");
const joi_1 = __importDefault(require("joi"));
const sequelize_1 = require("../../../core/sequelize");
const User_1 = require("../../../models/User");
const schema = joi_1.default.object({
    firstName: joi_1.default.string().max(100).required(),
    lastName: joi_1.default.string().max(100).required(),
    registerNo: joi_1.default.string().max(45).required(),
    phone: joi_1.default.string().max(45).required(),
    email: joi_1.default.string().max(255).required(),
    password: joi_1.default.string().max(255).required(),
});
console.log("********1******");
exports.default = xs_micro_service_1.Method.post("/user/create", schema, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, firstName, lastName, registerNo, phone, email, password, } = req.body;
    console.log("********2******");
    console.log(req.body);
    return (0, sequelize_1.startTransaction)((commit, rollback, transaction) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existUser = yield User_1.User.findOne({ where: { email: email.toLowerCase() }, transaction });
            console.log(existUser);
            // if (existUser) throw new ValidationError(ERRORS.USER_ALREADY_REGISTERED, "Хэрэглэгч бүртгэгдсэн байна.");
            let user = new User_1.User({
                registerNo: registerNo,
                id: id,
                lastName: lastName.trim(),
                firstName: firstName.trim(),
                phone: phone,
                email: email.toLowerCase(),
                password: password
            });
            yield user.save({ transaction });
            yield commit();
            res.json({ success: true });
        }
        catch (err) {
            yield rollback();
            throw err;
        }
    }));
}));
