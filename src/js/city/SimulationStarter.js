
import {PLACE_UPDATER} from './PlaceUpdater.js';
import {RANDOM_UPDATER} from './RandomUpdater.js';

import {Entity} from './Entity.js';

import {createDefaultCircleConfig} from './render/CircleDisplayConfig.js';

import {init} from './CanvasRender.js';

let entities = [];

export function startSimulation() {

	for(let	i=0;i<10000;i++){

		let xPos = Math.floor(Math.random()*999) + 1;
		let yPos = Math.floor(Math.random()*999) + 1;

    const config = createDefaultCircleConfig();

    if(xPos > 500){
      config.color = "#008000";
    } else {
      config.color = "#800080";
    }
		entities.push(new Entity({
			xPos:xPos,
			yPos:yPos,
			moveUpdater:RANDOM_UPDATER,
			displayConfig:config
		}));
	}

	PLACE_UPDATER.start();
	init();
}

