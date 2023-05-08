"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.User = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sequelize_1 = require("sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
let User = class User extends sequelize_typescript_1.Model {
    static findOne(arg0) {
        throw new Error("Method not implemented.");
    }
    save(arg0) {
        throw new Error("Method not implemented.");
    }
    updatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            this.password = `some encrypts...${password}`;
            yield this.save();
        });
    }
    validatePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.password)
                return false;
            const valid = yield bcryptjs_1.default.compare(password, this.password);
            return valid;
        });
    }
    createPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const SALT_ROUNDS = 10;
            const newPassword = yield bcryptjs_1.default.hash(password, SALT_ROUNDS);
            this.password = newPassword;
            return newPassword;
        });
    }
};
__decorate([
    (0, sequelize_typescript_1.IsUUID)(4),
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({ field: "id", defaultValue: sequelize_1.DataTypes.UUIDV4, type: sequelize_1.DataTypes.UUIDV4 }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "created_at", type: sequelize_1.DataTypes.DATE }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "updated_at", type: sequelize_1.DataTypes.DATE }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "is_active", type: sequelize_1.DataTypes.BOOLEAN, defaultValue: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "email", type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "username", type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "session_id" }),
    __metadata("design:type", String)
], User.prototype, "sessionId", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "phone", type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "last_name", type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "first_name", type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({ field: "password", type: sequelize_1.DataTypes.STRING }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
User = __decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "user", timestamps: true, paranoid: true })
], User);
exports.User = User;
