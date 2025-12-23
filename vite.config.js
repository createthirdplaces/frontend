import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import handlebars from "vite-plugin-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/static/partials"),
    }),
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
        boardListing: resolve(__dirname, "src/static/dc/boardListing.html"),

        decentralizedMeetup: resolve(__dirname, "src/static/events/decentralizedMeetup.html"),

        framework: resolve(__dirname, "src/static/tech/placesjs.html"),

        locationListingTutorial: resolve(__dirname, "src/static/locationListingTutorial.html"),
        locationMapListing: resolve(__dirname, "src/static/locationMapListing.html"),

        main: resolve(__dirname, "src/index.html"),
        meetupProblems: resolve(__dirname, "src/static/places.html"),

        places: resolve(__dirname, "src/static/events/meetupProblems.html"),

        techStrategy: resolve(__dirname, "src/static/tech/techStrategy.html"),
        toasterTrouble: resolve(__dirname, "src/static/toasterTrouble.html"),

        vision: resolve(__dirname, "src/static/vision.html")

      },
    },
  },
});
