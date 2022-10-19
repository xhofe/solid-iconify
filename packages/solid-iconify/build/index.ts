import path from "path"
import fs from "fs"
import arg from "arg"
import { buildAssets } from "./assets"
import { buildCollections } from "./collections"
import { Collections } from "./types"
import { getFileByPath } from "./utils"
import { DIST_PATH, supportedArgs } from "./constants"

function getArgs() {
  const args = arg({
    [supportedArgs.ISOLATE]: String,
    [supportedArgs.WEB]: Boolean,
  })

  return {
    isIsolate: args[supportedArgs.ISOLATE],
    buildWeb: args[supportedArgs.WEB],
  }
}

const main = async () => {
  const { isIsolate, buildWeb } = getArgs()

  fs.rmSync(DIST_PATH, { recursive: true, force: true })
  const collectionsObj: Collections = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/collections.json`))
  )
  const collections = Object.entries(collectionsObj).filter(([name, _]) => {
    return typeof isIsolate === "string" ? name.includes(isIsolate) : true
  })
  await buildAssets(collections)
  buildCollections(collections)
}

main()
