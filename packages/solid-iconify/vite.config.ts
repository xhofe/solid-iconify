import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import dts from "vite-plugin-dts";
import { resolve } from "path";

export default defineConfig({
  plugins: [solidPlugin(), dts()],
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
    outDir: "dist/lib",
    lib:
      process.env.NODE_ENV === "production"
        ? {
            entry: resolve(__dirname, "src/lib/index.tsx"),
            // name: "SolidLib",
            fileName: "index",
            formats: ["es", "cjs"],
          }
        : undefined,
    rollupOptions: {
      external: ["solid-js", "solid-js/web", "solid-js/store"],
    },
  },
});
