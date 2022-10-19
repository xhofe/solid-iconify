import type { IconContent, IconAlias } from "./types"
function cjsTemplate(icon: IconContent): string {
  return /* javascript */ `
module.exports.${icon.name} = function ${icon.name}(props) {
    return IconTemplate({
      a: ${JSON.stringify(icon.svgAttribs)},
      c: '${icon.contents}'
    }, props)
}`
}

function moduleTemplate(icon: IconContent) {
  return /* javascript */ `
export const ${icon.name} = (props) => {
    return IconTemplate({
      a: ${JSON.stringify(icon.svgAttribs)},
      c: '${icon.contents}'
    }, props)
}`
}

function typesTemplate(icon: IconContent) {
  return /* javascript */ `\nexport declare const ${icon.name}: IconTypes;`
}

export const fileTypes = [
  {
    type: "cjs",
    template: (iconContent: IconContent) => cjsTemplate(iconContent),
    aliasTemplate: (alias: IconAlias) => {
      return /* javascript */ `
module.exports.${alias.name} = module.exports.${alias.alias}`
    },
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `var IconTemplate = require('../lib/index.cjs').IconTemplate;\n`,
    fileName: "index.cjs",
  },
  {
    type: "mjs",
    template: (iconContent: IconContent) => moduleTemplate(iconContent),
    aliasTemplate: (alias: IconAlias) => {
      return /* javascript */ `
export const ${alias.name} = ${alias.alias}`
    },
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import { IconTemplate } from "../lib/index.js";\n`,
    fileName: "index.js",
  },
  {
    type: "types",
    template: (iconContent: IconContent) => typesTemplate(iconContent),
    aliasTemplate: (alias: IconAlias) => {
      return /* javascript */ `
export declare const ${alias.name}: IconTypes;`
    },
    // eslint-disable-next-line quotes, @typescript-eslint/quotes
    header: /* javascript */ `import type { IconTypes } from "../lib/index"\n`,
    fileName: "index.d.ts",
  },
]
