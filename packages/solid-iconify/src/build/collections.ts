import chalk from "chalk"
import fs from "fs"
import { DIST_PATH, log } from "./constants"
import { fileTypes } from "./file-types"
import { Collection } from "./types"

function writeEachPack(name: string, collection: Collection) {
  const packFolder = `${DIST_PATH}/${name}`

  fs.mkdirSync(packFolder)

  for (let index = 0; index < fileTypes.length; index++) {
    const type = fileTypes[index]
    const fileName = `${packFolder}/${type.fileName}`

    fs.appendFileSync(fileName, type.header)
  }

  log(
    chalk.white(`📦 ${name}`) +
      chalk.dim(" package has been generated") +
      chalk.green(" ✓")
  )
}

export const buildCollections = (collections: [string, Collection][]) => {
  collections.forEach(([name, collection]) => {
    writeEachPack(name, collection)
  })
}
