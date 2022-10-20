import { IconifyJSON } from "@iconify/types"
import chalk from "chalk"
import path from "path"
import fs from "fs"
import { DIST_PATH, log } from "./constants"
import { CollectionInfo, Collection } from "./types"
import {
  convertCollectionName,
  getFileByPath,
  getIconName,
  mkdirSync,
} from "./utils"

const buildPack = (
  cName: string,
  convertedName: string,
  collection: CollectionInfo
): Collection => {
  const icons: IconifyJSON = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/json/${cName}.json`))
  )
  const iconNames = Object.entries(icons.icons).map(([iName]) => {
    return getIconName(convertedName, iName)
  })
  const aliases = Object.entries(icons.aliases ?? {}).map(([iName, alias]) => {
    return getIconName(convertedName, iName)
  })
  return {
    ...collection,
    icons: [...iconNames, ...aliases],
  }
}

export const buildWeb = (collectionInfos: [string, CollectionInfo][]) => {
  mkdirSync(DIST_PATH)
  const dist_file = `${DIST_PATH}/web.json`
  const collections: Collection[] = []

  const map = new Map<string, string>()
  for (const [cName, collectionInfo] of collectionInfos) {
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
    const collection = buildPack(cName, convertedName, collectionInfo)
    collections.push(collection)
  }
  fs.appendFileSync(dist_file, JSON.stringify(collections, null, 2))
}
