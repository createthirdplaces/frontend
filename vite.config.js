import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
  ],
  root: "src/",
  publicDir: "../public",
  build: {
    cssCodeSplit: false,
    emptyOutDir: true,
    outDir: "../dist",
    rollupOptions: {
      input: {
        billOne: resolve(__dirname, "src/static/b26-0132.html"),
        createTimerTutorial: resolve(__dirname, "src/static/locationListingTutorial.html"),

        framework: resolve(__dirname, "src/static/placesjs.html"),
        main: resolve(__dirname, "src/index.html"),
      },
    },
  },
});
