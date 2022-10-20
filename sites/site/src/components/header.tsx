import { Link } from "@solidjs/router"
import { CharmSearch } from "solid-iconify/charm"
import { MdiGithub } from "solid-iconify/mdi"
import { createEffect, createSignal, Show } from "solid-js"
import { CarbonMoon, CarbonSun } from "solid-iconify/carbon"
import { Dynamic } from "solid-js/web"

export const Header = () => {
  const [dark, setDark] = createSignal(
    document.querySelector("html")?.classList.contains("dark")
  )
  createEffect(() => {
    document.querySelector("html")?.classList.toggle("dark", dark())
  })

  return (
    <div
      flex="row"
      items="center"
      justify="between"
      p="4"
      w="full"
      border-b
      border="gray-5/30"
    >
      <Link href="/pack/all">
        <CharmSearch size={30} />
      </Link>
      <h1 text="xl" font="bold">
        Solid iconify
      </h1>
      <div flex="row" gap="2">
        <Dynamic
          component={dark() ? CarbonMoon : CarbonSun}
          size={30}
          onClick={() => setDark(!dark())}
        />
        <a href="https://github.com/Xhofe/solid-iconify">
          <MdiGithub size={30} />
        </a>
      </div>
    </div>
  )
}
