import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: [
        resolve(import.meta.dirname, "preview.html"),
        resolve(import.meta.dirname, "login.html"),
        resolve(import.meta.dirname, "register.html"),
        resolve(import.meta.dirname, "game.html"),
      ],
    },
  },
});
