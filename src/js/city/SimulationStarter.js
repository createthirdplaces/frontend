
import {PLACE_UPDATER} from './PlaceUpdater.js';
import {RANDOM_UPDATER} from './RandomUpdater.js';

import {Entity} from './Entity.js';

import {createDefaultCircleConfig} from './render/CircleDisplayConfig.js';

import {init} from './CanvasRender.js';

let entities = [];

export function startSimulation() {
	
	for(let	i=0;i<10;i++){

		let xPos = Math.floor(Math.random()*499) + 1;
		let yPos = Math.floor(Math.random()*499) + 1;

		entities.push(new Entity({
			xPos:xPos,
			yPos:yPos,
			moveUpdater:RANDOM_UPDATER,
			displayConfig:createDefaultCircleConfig()
		}));
	}

	PLACE_UPDATER.start();
	init();
}

