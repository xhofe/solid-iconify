import { IconifyJSON } from "@iconify/types"
import chalk from "chalk"
import fs from "fs"
import path from "path"
import { DIST_PATH, log } from "./constants"
import { fileTypes } from "./file-types"
import { CollectionInfo } from "./types"
import { firstUpperCase, getFileByPath } from "./utils"

const getIconName = (cName: string, iName: string) => {
  return `${firstUpperCase(cName)}-${iName}`.replace(
    /-(\w)/g,
    (all, letter) => {
      return letter.toUpperCase()
    }
  )
}

function writeEachPack(cname: string, collection: CollectionInfo) {
  const packFolder = `${DIST_PATH}/${cname}`

  fs.mkdirSync(packFolder)

  for (let index = 0; index < fileTypes.length; index++) {
    const type = fileTypes[index]
    const fileName = `${packFolder}/${type.fileName}`

    fs.appendFileSync(fileName, type.header)
    const icons: IconifyJSON = JSON.parse(
      getFileByPath(
        path.resolve(`node_modules/@iconify/json/json/${cname}.json`)
      )
    )

    Object.entries(icons.icons).forEach(([iName, icon]) => {
      fs.appendFileSync(
        fileName,
        type.template({
          contents: icon.body,
          name: getIconName(cname, iName),
          svgAttribs: {
            height: icon.height?.toString(),
            viewBox: `0 0 ${icons.width} ${icons.height}`,
          },
        })
      )
    })

    Object.entries(icons.aliases ?? {}).forEach(([iName, alias]) => {
      fs.appendFileSync(
        fileName,
        type.aliasTemplate({
          name: getIconName(cname, iName),
          alias: getIconName(cname, alias.parent),
        })
      )
    })
  }

  log(
    chalk.white(`📦 ${cname}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  )
}

export const buildCollections = (collections: [string, CollectionInfo][]) => {
  for (const [cname, collection] of collections) {
    writeEachPack(cname, collection)
  }
}
