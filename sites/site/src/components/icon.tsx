import { splitProps } from "solid-js"
import "iconify-icon"

export interface IconProps {
  dir: string
  icon: string
  size?: string | number
}
export const Icon = (props: IconProps) => {
  const size = () => {
    if (typeof props.size === "number") {
      return props.size + "px"
    }
    return props.size
  }
  return (
    // @ts-ignore
    <iconify-icon
      icon={props.dir + ":" + props.icon}
      style={`font-size: ${size()}`}
    // @ts-ignore
    ></iconify-icon>
  )
}
