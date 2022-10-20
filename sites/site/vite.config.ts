import { defineConfig } from "vite"
import solidPlugin from "vite-plugin-solid"
import Unocss from "unocss/vite"

export default defineConfig({
  plugins: [solidPlugin(), Unocss()],
  server: {
    port: 3000,
  },
  base: "/solid-iconify/",
  build: {
    target: "esnext",
  },
})
