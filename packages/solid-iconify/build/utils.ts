import fs from "fs"
import path from "path"

export const getFileByPath = (path: string) => fs.readFileSync(path, "utf8")

export const mkdirSync = (dirname: string) => {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

export const firstUpperCase = (str: string) => {
  if (!str || str.length === 0) {
    return ""
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const convertCollectionName = (name: string) => {
  let ans = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  // let ans = name
  // if (name.includes("-")) {
  //   ans = name
  //     .split("-")
  //     .map((part) => part[0])
  //     .join("")
  // } else if (name.length > 6) {
  //   ans = name.slice(0, 2)
  // }
  return firstUpperCase(ans)
}

export const getIconName = (cName: string, iName: string) => {
  return `${cName}-${iName}`.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}
