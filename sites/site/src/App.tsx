import type { Component } from "solid-js"
import { Twemoji1stPlaceMedal } from "solid-iconify/twemoji"

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
      <Twemoji1stPlaceMedal size={100} />
    </div>
  )
}

export default App
