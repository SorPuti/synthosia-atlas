import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        atlas: resolve(import.meta.dirname, "index.html"),
        notfound: resolve(import.meta.dirname, "404.html"),
      },
    },
  },
});
