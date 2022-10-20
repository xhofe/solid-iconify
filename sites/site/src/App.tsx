import { Route, Routes } from "@solidjs/router"
import { Component, lazy } from "solid-js"
import { Header } from "./components/header"

const App: Component = () => {
  return (
    <div>
      <Header />
      <div p="4">
        <Routes>
          <Route
            path="/"
            component={lazy(() => import("./pages/collections"))}
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
