import fs from "fs"

export const getFileByPath = (path: string) => fs.readFileSync(path, "utf8")

export const firstUpperCase = (str: string) => {
  if (!str || str.length === 0) {
    return ""
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}