import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { config } from "../config";
import path from "path";

export const sequelize = new Sequelize({
  host    : config.database.host,
  port    : config.database.port,
  database: config.database.database,
  dialect : config.database.dialect,
  username: config.database.username,
  password: config.database.password,
  models  : [path.join(__dirname, "/../models/*.js")],
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IFilter = any;

export default {
  connect: async () => {
    await sequelize.authenticate();
  }
};

export const startTransaction = async <T>(callback: (commit: () => Promise<void>, rollback: () => Promise<void>, t: Transaction) => Promise<T>): Promise<T> => {
  const t = await sequelize.transaction();

  const commit = async () => {
    return await t.commit();
  };

  const rollback = async () => {
    return await t.rollback();
  };

  return callback(commit, rollback, t);
};

export const nextSequence = async (name: string, prefix: string, MIN_VALUE = 100000) => {
  const sequence = `NEXT_${name}_SEQ`;

  const nextVal = async () => {
    const result = await sequelize.query(`SELECT nextval('${sequence}');`) as [{ nextval: string }][];

    if (!(result && result[0] && result[0][0] && result[0][0].nextval))
      throw new Error("SEQUENCE_NEXVAL_ERROR");

    return prefix ? prefix + result[0][0].nextval : result[0][0].nextval;
  };
  
  return nextVal()
    .catch(() => {
      return sequelize.query(`CREATE SEQUENCE ${sequence} START ${MIN_VALUE};`)
        .then(() => nextVal());
    });
};