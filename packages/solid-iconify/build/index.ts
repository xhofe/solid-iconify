import path from "path"
import fs from "fs"
import arg from "arg"
import { buildAssets } from "./assets"
import { buildCollections } from "./collections"
import { Collections } from "./types"
import { getFileByPath } from "./utils"
import { DIST_PATH, supportedArgs } from "./constants"
import { buildWeb } from "./web"

function getArgs() {
  const args = arg({
    [supportedArgs.ISOLATE]: String,
    [supportedArgs.WEB]: Boolean,
  })

  return {
    isIsolate: args[supportedArgs.ISOLATE],
    isBuildWeb: args[supportedArgs.WEB],
  }
}

const main = async () => {
  const { isIsolate, isBuildWeb } = getArgs()
  const collectionsObj: Collections = JSON.parse(
    getFileByPath(path.resolve(`node_modules/@iconify/json/collections.json`))
  )
  const collections = Object.entries(collectionsObj).filter(([name, _]) => {
    return typeof isIsolate === "string" ? name.includes(isIsolate) : true
  })
  if (isBuildWeb) {
    buildWeb(collections)
  } else {
    fs.rmSync(DIST_PATH, { recursive: true, force: true })
    await buildAssets(collections)
    buildCollections(collections)
  }
}

main()
