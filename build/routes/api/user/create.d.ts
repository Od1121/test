/// <reference types="qs" />
/// <reference types="express" />
import Joi from "joi";
declare const _default: (string | Joi.AnySchema<any> | ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => Promise<void>) | null)[];
export default _default;
