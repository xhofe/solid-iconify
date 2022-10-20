import type { Component } from "solid-js"
import { Twemoji1stPlaceMedal } from "solid-iconify/twemoji"
import {
  FluentAccessibility16Regular,
  FluentAddCircle32Filled,
} from "solid-iconify/fluent"

const App: Component = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <Twemoji1stPlaceMedal size={100} />
      </div>
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <FluentAccessibility16Regular size={100} />
      </div>
      <div
        style={{
          border: "1px solid black",
        }}
      >
        <FluentAddCircle32Filled size={100} />
      </div>
    </div>
  )
}

export default App
