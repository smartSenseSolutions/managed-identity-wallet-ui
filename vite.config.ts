import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  server: { port: 3004, strictPort: true },
  preview: { port: 3004 },
  base: "./",
  publicDir: "public",
  resolve: {
    alias: {
      "@miw": path.resolve(__dirname, "./src"),
    },
  },
});
