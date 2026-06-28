import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  css: {
    postcss: {},
  },
  test: {
    environment: "node",
    globals: true,
    setupFiles: [],
    include: ["src/__tests__/**/*.test.ts"],
    exclude: ["src/__tests__/**/*.tsx.test.ts"],
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
