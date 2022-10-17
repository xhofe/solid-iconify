export interface IconContent {
  contents: string
  svgAttribs: SVGAttribs
  fileName: string
}

export interface SVGAttribs {
  viewBox?: string
  height?: string
}

export type Collection = {
  name: string
  total: number
  author: {
    name: string
    url: string
  }
  license: {
    title: string
    spdx: string
    url: string
  }
  samples: Array<string>
  height: number
  category: string
  palette: boolean
}

export type Collections = {
  [key: string]: Collection
}

export interface PackageJSONExport {
  [key: string]: PackageJSONItem;
}

interface PackageJSONItem {
  [key: string]: unknown;
}

