import path from "path"
import fs from "fs"
import { buildAssets } from "./assets"
import { buildCollections } from "./collections"
import { Collections } from "./types"
import { getFileByPath } from "./utils"
import { DIST_PATH } from "./constants"

const main = async () => {
  fs.rmSync(DIST_PATH, { recursive: true, force: true })
  const collectionsObj: Collections = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/collections.json`))
  )
  const collections = Object.entries(collectionsObj)
  await buildAssets(collections)
  buildCollections(collections)
}

main()
