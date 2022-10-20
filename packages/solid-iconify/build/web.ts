import { IconifyJSON } from "@iconify/types"
import chalk from "chalk"
import path from "path"
import fs from "fs"
import { DIST_PATH, log } from "./constants"
import { CollectionInfo, Collection, SVGAttribs } from "./types"
import {
  convertCollectionName,
  getFileByPath,
  getIconName,
  mkdirSync,
} from "./utils"
import { getIconData, iconToSVG } from "@iconify/utils"

const buildPack = (
  cName: string,
  convertedName: string,
  collection: CollectionInfo
): Collection => {
  const icons: IconifyJSON = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/json/${cName}.json`))
  )
  const nameSet = new Set<string>()
  const Icons: {
    [key: string]:
      | {
          body: string
          attribs: SVGAttribs
        }
      | {
          parent: string
        }
  } = {}
  Object.entries(icons.icons).map(([iName]) => {
    const name = getIconName(convertedName, iName)
    if (nameSet.has(name)) {
      return
    }
    nameSet.add(name)
    const iconData = getIconData(icons, iName)
    if (!iconData) {
      log(chalk.red(`Icon ${iName} not found in ${cName}`) + chalk.yellow("!"))
      return
    }
    const renderData = iconToSVG(iconData, {
      height: "auto",
    })
    Icons[name] = {
      body: renderData.body,
      attribs: renderData.attributes,
    }
  })
  Object.entries(icons.aliases ?? {}).map(([iName, alias]) => {
    const name = getIconName(convertedName, iName)
    const aliasName = getIconName(convertedName, alias.parent)
    if (nameSet.has(name) || !nameSet.has(aliasName)) {
      return
    }
    Icons[name] = {
      parent: aliasName,
    }
  })
  return {
    dir: cName,
    ...collection,
    icons: Icons,
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
