import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import handlebars from "vite-plugin-handlebars";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "src/partials"),
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

        apiEndpoints: resolve(__dirname, "src/tech/apiEndpoints.html"),
        billOne: resolve(__dirname, "src/dc/b26-0132.html"),
        boardListing: resolve(__dirname, "src/dc/boardListing.html"),

        databaseDesign: resolve(__dirname, "src/tech/databaseDesign.html"),
        decentralizedEventHosting: resolve(__dirname, "src/events/decentralizedEventHosting.html"),

        eventTechOverview: resolve(__dirname, "src/events/techOverview.html"),
        
        framework: resolve(__dirname, "src/tech/placesjs.html"),

        goodThirdPlace: resolve(__dirname, "src/goodThirdPlace.html"),

        hostingAdvice: resolve(__dirname, "src/events/hostingAdvice.html"),

        locationListingTutorial: resolve(__dirname, "src/tech/locationListingTutorial.html"),
        locationMapListing: resolve(__dirname, "src/locationMapListing.html"),

        main: resolve(__dirname, "src/index.html"),
        otherWebsites: resolve(__dirname, "src/otherWebsites.html"),

        places: resolve(__dirname, "src/events/meetupProblems.html"),

        recommendedBooks: resolve(__dirname,"src/recommendedBooks.html"),
        rejectedIdeas: resolve(__dirname,"src/ideas/rejectedIdeas.html"),

        software: resolve(__dirname, "src/tech/software.html"),


        takeAction: resolve(__dirname, "src/takeAction.html"),
        techStrategy: resolve(__dirname, "src/tech/techStrategy.html"),
        toasterTrouble: resolve(__dirname, "src/toasterTrouble.html"),

        vision: resolve(__dirname, "src/vision.html")
      },
    },
  },
});
