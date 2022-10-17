import fs from "fs"
import chalk from "chalk"
import { promisify } from "util"
import { exec } from "child_process"
import path from "path"

import {
  DIST_PATH,
  log,
  includedFiles,
  ROOT_PATH,
  ROOT_EXPORT,
  LIB_PACKAGE_JSON,
} from "./constants"
import { fileTypes } from "./file-types"
import { getFileByPath } from "./utils"
import { Collection, Collections, PackageJSONExport } from "./types"

const execAsync = promisify(exec)

const buildLib = async () => {
  await Promise.all([execAsync("pnpm build:lib", { cwd: ROOT_PATH })])
  fs.appendFileSync(`${DIST_PATH}/lib/package.json`, LIB_PACKAGE_JSON)
  log(chalk.dim(" lib has been built") + chalk.green(" ✓"))
}

const copyIncludedFiles = () => {
  includedFiles.forEach((file) => {
    fs.cpSync(path.resolve(file), `${DIST_PATH}/${file.split("/").pop()}`)
  })
  log(chalk.dim(" includes files has been copied") + chalk.green(" ✓"))
}

function getPackageExports(
  previousValue: PackageJSONExport,
  current: [string, Collection]
): PackageJSONExport {
  const exportsPayload = {
    import: `./${current[0]}/index.js`,
    require: `./${current[0]}/index.cjs`,
  }
  return { ...previousValue, [`./${current[0]}`]: exportsPayload }
}

function writePackageJson(collections: [string, Collection][]) {
  const packageJson = JSON.parse(getFileByPath(`${ROOT_PATH}/package.json`))

  delete packageJson.devDependencies
  delete packageJson.scripts
  delete packageJson.type

  packageJson.exports = {
    ["."]: ROOT_EXPORT,
    ...collections.reduce(getPackageExports, {}),
  }

  fs.appendFileSync(
    `${DIST_PATH}/package.json`,
    JSON.stringify(packageJson, null, 2)
  )
}

export const buildAssets = async (collections: [string, Collection][]) => {
  await buildLib()
  copyIncludedFiles()
  writePackageJson(collections)

  log(chalk.dim("🍬 Lib artifacts has been bundled") + chalk.green(" ✓"))
}
