import path from "node:path";
import react from "@vitejs/plugin-react";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig, splitVendorChunkPlugin } from "vite";

const isDev = process.env.TAURI_DEBUG === "true";

export default defineConfig(() => ({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    Unfonts({
      fontsource: {
        families: [
          {
            name: "Inter",
            weights: [400, 500],
            styles: ["normal"],
            subset: "latin",
          },
        ],
      },
    }),
  ],
  build: {
    minify: isDev ? false : "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("@remix-run") || id.includes("react-router")) {
            return "react-router";
          }
          if (id.includes("markdown-it")) {
            return "markdown-it";
          }
          if (id.includes("prosemirror")) {
            return "prosemirror";
          }
        },
      },
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));
