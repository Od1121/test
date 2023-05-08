import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
export declare const sequelize: Sequelize;
export type IFilter = any;
declare const _default: {
    connect: () => Promise<void>;
};
export default _default;
export declare const startTransaction: <T>(callback: (commit: () => Promise<void>, rollback: () => Promise<void>, t: Transaction) => Promise<T>) => Promise<T>;
export declare const nextSequence: (name: string, prefix: string, MIN_VALUE?: number) => Promise<string>;
