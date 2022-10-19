import { IconifyInfo } from "@iconify/types"
export interface IconContent {
  contents: string
  svgAttribs: SVGAttribs
  name: string
}

export interface IconAlias {
  name: string
  alias: string
}

export interface SVGAttribs {
  viewBox?: string
  height?: string
}

export interface PackageJSONExport {
  [key: string]: PackageJSONItem
}

interface PackageJSONItem {
  [key: string]: unknown
}

export type CollectionInfo = IconifyInfo

export type Collections = {
  [key: string]: CollectionInfo
}
