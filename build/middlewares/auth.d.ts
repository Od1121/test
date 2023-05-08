import { NextFunction } from "express";
import { Request, Response } from "./sign";
export declare const auth: (req: Request, res: Response, next: NextFunction) => Promise<void>;
