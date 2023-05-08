/// <reference types="qs" />
/// <reference types="express" />
declare const _default: (string | import("joi").AnySchema<any> | ((req: import("express").Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: import("express").Response<any, Record<string, any>>) => Promise<void>) | null)[];
export default _default;
