/// <reference types="node" />
import { Server } from "http";
export declare let http: Server;
export declare const server: (supertest?: boolean) => Promise<import("express-serve-static-core").Express | undefined>;
