import { Link } from "@solidjs/router"
import { CharmSearch } from "solid-iconify/charm"
import { MdiGithub } from "solid-iconify/mdi"

export const Header = () => {
  return (
    <div flex="row" items="center" justify="between" p="4">
      <Link href="/pack/all">
        <CharmSearch size={40} />
      </Link>
      <h3>Solid iconify</h3>
      <a href="https://github.com/Xhofe/solid-iconify">
        <MdiGithub />
      </a>
    </div>
  )
}
