import { IconifyJSON } from "@iconify/types"
import chalk from "chalk"
import fs from "fs"
import path from "path"
import { DIST_PATH, log } from "./constants"
import { fileTypes } from "./file-types"
import { CollectionInfo } from "./types"
import { convertCollectionName, getFileByPath, getIconName } from "./utils"

function writeEachPack(
  cName: string,
  convertedName: string,
  collection: CollectionInfo
) {
  const packFolder = `${DIST_PATH}/${cName}`

  fs.mkdirSync(packFolder)
  const icons: IconifyJSON = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/json/${cName}.json`))
  )
  for (let index = 0; index < fileTypes.length; index++) {
    const type = fileTypes[index]
    const fileName = `${packFolder}/${type.fileName}`
    fs.appendFileSync(fileName, type.header)

    Object.entries(icons.icons).forEach(([iName, icon]) => {
      let width = icon.width ?? icons.width
      let height = icon.height ?? icons.height
      fs.appendFileSync(
        fileName,
        type.template({
          contents: icon.body,
          name: getIconName(convertedName, iName),
          svgAttribs: {
            height: icon.height?.toString(),
            viewBox: `0 0 ${width} ${height}`,
          },
        })
      )
    })

    Object.entries(icons.aliases ?? {}).forEach(([iName, alias]) => {
      fs.appendFileSync(
        fileName,
        type.aliasTemplate({
          name: getIconName(convertedName, iName),
          alias: getIconName(convertedName, alias.parent),
        })
      )
    })
  }

  log(
    chalk.white(`📦 ${cName}`) +
      chalk.blue(` -> ${convertedName}`) +
      chalk.cyan(`(${collection.total ?? "unknown"} icons)`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  )
}

export const buildCollections = (collections: [string, CollectionInfo][]) => {
  const map = new Map<string, string>()
  for (const [cName, collection] of collections) {
    const convertedName = convertCollectionName(cName)
    if (map.has(convertedName)) {
      log(
        chalk.white(`❗ ${cName}`) +
          chalk.red(" is duplicated with") +
          chalk.white(` ${map.get(convertedName)}`) +
          chalk.yellow(" !")
      )
    } else {
      map.set(convertedName, cName)
    }
    writeEachPack(cName, convertedName, collection)
  }
}
