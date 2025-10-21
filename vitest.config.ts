// vitest.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  // env: { DEV: false, PROD: false },
  // inspector: { enabled: false },
  plugins: [vue(), vueJsx()],
  define: {
    DEV: JSON.stringify(false),
    PROD: JSON.stringify(false),
    TEST: JSON.stringify(true),
  },
  test: {
    // inspector: { enabled: false },
    globals: true,
    environment: "jsdom",
    setupFiles: [resolve(__dirname, "./vitest.setup.ts")],
  },
});

// "test": "vitest --coverage"