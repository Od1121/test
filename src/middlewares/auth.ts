import { UnauthorizedError } from "@goodtechsoft/xs-micro-service";
import { NextFunction } from "express";
import { config } from "../config";
import { ERRORS } from "../constants";
import jwt from "jsonwebtoken";
import { Request, Response } from "./sign";
import { User } from "../models/User";

type JwtExpPayload = {
  uid: string;
  scp: string;
  sid: string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const header = `${req.headers.authorization}`;
  try {
    let decoded;

    try {
      decoded = jwt.verify(header?.split(" ")[1], config.jwt.apiSecret) as JwtExpPayload;
      console.log(`🚀 ~ ${req.path} auth decoded`, decoded);
    } catch (err) {
      console.log(`🚀 ~ ${req.path} auth err`, err);
      throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);
    }
    const user = User.findOne({
      where: {
        id: decoded.uid
      }
    });
    if (!user) throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);
    if (user.sessionId !== decoded.sid) throw new UnauthorizedError(ERRORS.NO_CREDENTIALS);

    req.user = user;
    req.sessionScope = decoded.scp;
    
    console.log(`🚀 ~ ${req.path} auth middleware done`);
    
    next();
  } catch (err) {
    next(err);
  }
};