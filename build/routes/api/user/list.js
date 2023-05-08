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
exports.default = xs_micro_service_1.Method.post(`/user/list`, null, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //end code oo bichne 
    //const existUser = await User.findAll({}); 
    res.json({
        test: "list"
    });
}));
