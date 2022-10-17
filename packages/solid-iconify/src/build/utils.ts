import fs from "fs"

export const getFileByPath = (path: string) => fs.readFileSync(path, "utf8")
