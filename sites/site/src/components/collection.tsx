import { For } from "solid-js"
import { CollectionType } from "../types"
import { getIconName } from "../utils"
import { Icon } from "./icon"

export const Collection = (collection: CollectionType) => {
  return (
    <div w="full" flex="row">
      <div flex="1">
        <h2>{collection.name}</h2>
        <p>{collection.author.name}</p>
        <p>{collection.license.title}</p>
      </div>
      <div>
        <For each={collection.samples}>
          {(sample) => (
            <Icon
              dir={collection.dir}
              icon={getIconName(collection.dir, sample)}
            />
          )}
        </For>
      </div>
    </div>
  )
}
