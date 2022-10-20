import { IconProps, IconTypes } from "solid-iconify"
import { lazy, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"

export interface LocalIconProps extends IconProps {
  dir: string
  icon: string
}
export const Icon = (props: LocalIconProps) => {
  const [local, others] = splitProps(props, ["dir", "icon"])
  const icon: Promise<{ default: IconTypes }> = import(
    `solid-iconify/${local.dir}`
  ).then((icons) => ({ default: icons[local.icon] }))
  return <Dynamic component={lazy(() => icon)} {...others} />
}
