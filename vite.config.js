import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: "./",
  server: { allowedHosts: true },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(root, "index.html"),
        solutions: resolve(root, "solutions.html"),
        projects: resolve(root, "projects.html"),
        about: resolve(root, "about.html"),
        contact: resolve(root, "contact.html"),
      },
    },
  },
});
