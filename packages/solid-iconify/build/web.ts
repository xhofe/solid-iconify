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
  const nameSet = new Set<string>()
  const iconNames = Object.entries(icons.icons).map(([iName]) => {
    const name = getIconName(convertedName, iName)
    if (nameSet.has(name)) {
      return
    }
    nameSet.add(name)
    return iName
  })
  const aliases = Object.entries(icons.aliases ?? {}).map(([iName, alias]) => {
    const name = getIconName(convertedName, iName)
    const aName = getIconName(convertedName, alias.parent)
    if (nameSet.has(name) || !nameSet.has(aName)) {
      return
    }
    nameSet.add(name)
    return iName
  })
  return {
    dir: cName,
    ...collection,
    icons: iconNames.concat(aliases).filter(Boolean) as string[],
  }
}

export const buildWeb = (collectionInfos: [string, CollectionInfo][]) => {
  mkdirSync(DIST_PATH)
  const dist_file = `${DIST_PATH}/web.json`
  fs.rmSync(dist_file, { force: true })
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
