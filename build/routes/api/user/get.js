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
Object.defineProperty(exports, "__esModule", { value: true });
const xs_micro_service_1 = require("@goodtechsoft/xs-micro-service");
const User_1 = require("../../../models/User");
const constants_1 = require("../../../constants");
exports.default = xs_micro_service_1.Method.post(`/user/get`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.user.id;
    const user = User_1.User.findOne({
        where: {
            id: id,
            //userId: req.user.userId
        }
    });
    if (!user)
        throw new xs_micro_service_1.NotfoundError(constants_1.ERRORS.USER_NOTFOUND, "Хэрэглэгч олдсонгүй!");
    const users = yield User_1.User.findAll({
        where: {
            UserId: user.id
        },
        include: [{
                models: user,
                as: "users",
                attributes: ["id"]
            }]
    });
    console.log(" >>>\n  ========== Method.get ========== users", users);
    //const existUser = await User.findAll({}); 
    res.json({
        test: "get"
    });
}));
