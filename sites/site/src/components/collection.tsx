import { Link } from "@solidjs/router"
import { For } from "solid-js"
import { CollectionType } from "../types"
import { getIconName } from "../utils"
import { Icon } from "./icon"

export const Collection = (collection: CollectionType) => {
  return (
    <Link href={`/collection/${collection.dir}`}>
      <div
        w="full"
        flex="row"
        rounded="md"
        p="2"
        border="~ gray/40"
        dark="border-gray-7"
        hover="border-indigo c-indigo"
        bg="gray/5"
      >
        <div flex="1" gap="1">
          <h2>{collection.name}</h2>
          <div opacity="60" text="xs">
            <p>{collection.author.name}</p>
            <p>{collection.license.title}</p>
            <p>{collection.total} icons</p>
          </div>
        </div>
        <div justify="between">
          <For each={collection.samples}>
            {(sample) => <Icon dir={collection.dir} icon={sample} size={20} />}
          </For>
        </div>
      </div>
    </Link>
  )
}
