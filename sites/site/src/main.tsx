/* @refresh reload */
import { render, Suspense } from "solid-js/web"

import "uno.css"
import "@unocss/reset/antfu.css"

import App from "./App"
import { Router } from "@solidjs/router"
import { Loading } from "./components/loading"

render(
  () => (
    <Router>
      <Suspense
        fallback={
          <div>
            <Loading />
          </div>
        }
      >
        <App />
      </Suspense>
    </Router>
  ),
  document.getElementById("root") as HTMLElement
)
