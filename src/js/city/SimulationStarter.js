import {DEFAULT_CIRCLE_DISPLAY_CONFIG} from 'CircleDisplayConfig.js';
import {RANDOM_UPDATER} from 'RandomUpdater.js';

import {RENDER_UPDATER} from 'RenderStore.js';

import {init} from 'CanvasRender.js';
let items = [];

export function startSimulation() {
	
	for(let	i=0;i<10;i++){

		let xPos = Math.floor(Math.random()*499) + 1;
		let yPos = Math.floor(Math.random()*499) + 1;

		items.push(new Item(
			xPos,
			yPos,
			RANDOM_UPDATER,
			DEFAULT_CIRCLE_DISPLAY_CONFIG
	}

	RENDER_UPDATER.start();
}
