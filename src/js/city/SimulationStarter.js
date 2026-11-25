import {CANVAS_ID,DISPLAY_HEIGHT, DISPLAY_WIDTH} from './Config.js';
import {PLACE_STORE,PLACE_UPDATER} from './PlaceUpdater.js';
import {RANDOM_UPDATER} from './RandomUpdater.js';

import {Entity} from './Entity.js';

import {createCollisionDetector} from './data/CollisionDetector.js';
import {createDefaultCircleConfig} from './render/lib/CircleDisplayConfig.js';
import {createErrorHandler} from './ErrorHandler.js';
import {init} from './render/lib/CanvasRender.js';

let entities = [];

export function startSimulation() {

	for(let	i=0; i<10000; i++){

		let xPos = Math.floor(Math.random()*DISPLAY_WIDTH - 1) + 1;
		let yPos = Math.floor(Math.random()*DISPLAY_HEIGHT - 1) + 1;

    const config = createDefaultCircleConfig();
		const errorHandler = createErrorHandler();
    if(xPos > DISPLAY_WIDTH/2){
      config.color = "#008000";
    } else {
      config.color = "#800080";
    }

		entities.push(new Entity({
			collisionDetector: createCollisionDetector({radius:5}),
			displayConfig:config,
			errorHandler:errorHandler,
			moveUpdater:RANDOM_UPDATER,
			xPos:xPos,
			yPos:yPos,
		}));
	}

	PLACE_UPDATER.start();
	init({
    canvasId:CANVAS_ID,
    displayHeight: DISPLAY_HEIGHT,
    displayWidth: DISPLAY_WIDTH,
    store: PLACE_STORE
  });
}

