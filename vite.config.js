import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  base: "/ong-apoio-solidario/",
  build: {
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: resolve(import.meta.dirname, "html/index.html")
    }
  }
});
