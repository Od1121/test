import express, { NextFunction } from "express";
import { User } from "../models/User";
export interface Request extends express.Request {
    body: Body;
    user?: User | null;
    deviceToken?: string | null;
    deviceImei?: string | null;
    sessionScope?: string | null;
}
export type Response = express.Response;
type SignProps = {
    user: User;
    refreshToken?: string;
    expiresIn?: number;
    sessionId: string;
};
export declare const signIn: (res: Response, { user, refreshToken, expiresIn, sessionId }: SignProps, SESSION_SCOPE?: string) => Promise<void>;
export declare const signOut: (res: Response) => void;
export declare const sign: (scope?: string | null) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export {};
