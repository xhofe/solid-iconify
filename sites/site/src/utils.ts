export const firstUpperCase = (str: string) => {
  if (!str || str.length === 0) {
    return ""
  }
  return str.charAt(0).toUpperCase() + str.slice(1)
}
export const convertCollectionName = (name: string) => {
  let ans = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return firstUpperCase(ans)
}

export const getIconName = (cName: string, iName: string) => {
  return `${cName}-${iName}`.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
}