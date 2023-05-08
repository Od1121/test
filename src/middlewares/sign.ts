import express, { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { User } from "../models/User";

export interface Request extends express.Request {
  body: Body;
  user?: User | null;
  deviceToken?: string | null;
  deviceImei?: string | null;
  sessionScope?: string | null;
}

export type Response = express.Response

type SignProps = {
  user: User;
  refreshToken?: string;
  expiresIn?: number;
  sessionId: string;

}

export const signIn = async (res: Response, { user, refreshToken, expiresIn, sessionId }: SignProps, SESSION_SCOPE = "AUTHORIZED") => {
  const accessToken = await jwt.sign(
    {
      uid: user.id,
      sid: sessionId,
      scp: SESSION_SCOPE
    },
    config.jwt.apiSecret,
    expiresIn ? { expiresIn: expiresIn } : {}
  );

  // user.set({
  //   sessionScope: SESSION_SCOPE
  // });

  // await user.save();

  res.cookie(config.server.name + ".sec", accessToken, {
    expires : new Date((expiresIn || 1) * 1000),
    secure  : false, // set to true if your using https
    httpOnly: true
  });

  res.json({
    userId      : user.id,
    tokenType   : "Bearer",
    accessToken : accessToken,
    refreshToken: refreshToken,
    sessionState: process.env.SERVER_ENV || "DEVELOPMENT"
    // sessionScope: SESSION_SCOPE
  });


}
export const signOut = (res: Response) => {
  res.clearCookie(config.server.name + ".sec");
  res.json({});
};

export const sign = (scope?: string | null) => async (req: Request, res: Response, next: NextFunction) => {
  const { "device-token": deviceToken, "device-imei": deviceImei } = req.headers;
}
;