import { defineConfig,loadEnv } from "vite";
import { dirname, resolve} from "node:path";
import { fileURLToPath } from "node:url";
import handlebars from "vite-plugin-handlebars";
import fs from 'node:fs';
import {globSync} from 'glob';

const buildConfig = {
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
        
        about: resolve(__dirname, "src/about.html"),
        apiEndpoints: resolve(__dirname, "src/tech/apiEndpoints.html"),
       
        boardListing: resolve(__dirname, "src/dc/boardListing.html"),

        contribute: resolve(__dirname, "src/contribute.html"),
        databaseDesign: resolve(__dirname, "src/tech/databaseDesign.html"),
        decentralizedEventHosting: resolve(__dirname, "src/events/decentralizedEventHosting.html"),
        designHelp: resolve(__dirname,"src/design/contribute.html"),
        designSystem: resolve(__dirname,"src/design/designSystem.html"),
        eventTechOverview: resolve(__dirname, "src/events/techOverview.html"),
        
        framework: resolve(__dirname, "src/tech/placesjs.html"),

        locationListingTutorial: resolve(__dirname, "src/tech/locationListingTutorial.html"),
        locationMapListing: resolve(__dirname, "src/locationMapListing.html"),

        main: resolve(__dirname, "src/index.html"),
        otherWebsites: resolve(__dirname, "src/otherWebsites.html"),

        places: resolve(__dirname, "src/events/meetupProblems.html"),
      	publicHealth: resolve(__dirname,"src/publicHealth.html"),
        recommendedBooks: resolve(__dirname,"src/recommendedBooks.html"),
        rejectedIdeas: resolve(__dirname,"src/ideas/rejectedIdeas.html"),

        software: resolve(__dirname, "src/tech/software.html"),
        support: resolve(__dirname, "src/support.html"),

        techStrategy: resolve(__dirname, "src/tech/techStrategy.html"),
        toasterTrouble: resolve(__dirname, "src/toasterTrouble.html"),

      },
    },
  },
}

console.log(process.env);
if(process.env.NODE_ENV === 'development'){
  const update=
  	{	
	    alias:{	
			  '/js/globalProd.js': resolve(__dirname, '/js/spellCheck.js')
				}	
    }
  buildConfig['resolve'] =  update;
}

Object.assign(buildConfig['build']['rollupOptions']['input'],globSync('src/articles/*.html'));
export default defineConfig(buildConfig);

