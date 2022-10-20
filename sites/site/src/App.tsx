import type { Component } from "solid-js"
import { Header } from "./components/header"
import data from "./web.json"

const App: Component = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default App
