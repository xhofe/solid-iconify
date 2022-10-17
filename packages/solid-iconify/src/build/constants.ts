import path from "path";

export const ROOT_PATH = path.resolve();
export const DIST_PATH = path.resolve("./dist");

export const log = console.log;

export const LIB_PACKAGE_JSON = /* javascript */ `{
  "main": "./index.cjs",
  "module": "./index.js"
}`;

export const PACK_PACKAGE_JSON = /* javascript */ `{
  "sideEffects": false,
  "module": "./index.js"
}`;

export const ROOT_EXPORT = {
  import: "./lib/index.js",
  require: "./lib/index.cjs",
};

export const includedFiles = ["../../LICENSE", "../../README.md"];