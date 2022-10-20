import { For } from "solid-js"
import { Collection } from "../components/collection"
import { CollectionType } from "../types"
import data from "../web.json"

const collections = data as CollectionType[]
const map = new Map<string, CollectionType[]>()
collections.forEach((collection) => {
  const category = collection.category ?? "Other"
  if (!map.has(category)) {
    map.set(category, [])
  }
  map.get(category)!.push(collection)
})

console.log(map)

const Collections = () => {
  return (
    <For each={Array.from(map.entries())}>
      {([category, collections]) => (
        <div>
          <h2 text-xl c-gray-5 p="2">
            {category}
          </h2>
          <div
            grid
            gap="2"
            style={{
              "grid-template-columns": "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            <For each={collections}>
              {(collection) => <Collection {...collection} />}
            </For>
          </div>
        </div>
      )}
    </For>
  )
}
export default Collections
