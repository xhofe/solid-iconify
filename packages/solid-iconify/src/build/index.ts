import path from "path"
import { buildAssets } from "./assets"
import { Collections } from "./types"
import { getFileByPath } from "./utils"

const main = async () => {
  const collectionsObj: Collections = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/collections.json`))
  )
  const collections = Object.entries(collectionsObj)
  await buildAssets(collections)
}
