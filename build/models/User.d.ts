import { Optional, Transaction } from "sequelize";
import { Model } from "sequelize-typescript";
export interface IUser {
    id?: string;
    isActive?: boolean;
    email?: string;
    phone?: string;
    lastName?: string | null;
    firstName?: string | null;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    registerNo?: string;
    sessionId?: string | null;
    validatePassword?: (password: string) => Promise<boolean>;
    createPassword?: (password: string) => Promise<string>;
}
type Attributes = Optional<IUser, "id">;
export declare class User extends Model<IUser, Attributes> {
    static findOne(arg0: {
        where: {
            email: string;
        };
        transaction: Transaction;
    }): void;
    save(arg0: {
        transaction: Transaction;
    }): void;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    email: string;
    username: string;
    sessionId: string;
    phone: string;
    lastName: string;
    firstName: string;
    password: string;
    updatePassword(password: string): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    createPassword(password: string): Promise<string>;
}
export {};
