/* @refresh reload */
import { render } from "solid-js/web"

import 'uno.css'
import '@unocss/reset/antfu.css'

import App from "./App"
import { Router } from "@solidjs/router"

render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById("root") as HTMLElement
)
