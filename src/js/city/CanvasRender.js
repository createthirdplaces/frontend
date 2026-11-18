import {PLACE_STORE} from './PlaceUpdater.js'

import {render} from './render/RenderMap.js';

class CanvasRender{

	constructor() {
		console.log("Making");
		PLACE_STORE.subscribeWithCallback(this.update);
	}

	update(updates){

		const canvas = document.getElementById("simulation-display");
		const ctx = canvas.getContext("2d");
		
		ctx.fillStyle="white";
		ctx.fillRect(0,0,1000,1000);
		/**
			TODO: Add clear() method for DisplayConfig if item needs to be re-rendered. This will allow canvas to only redraw items that have moved.
		**/

		const data = updates.updates;

		console.log("Updates with data:"+data.length);
		for(let i=0;i<data.length;i++){
		
			const xPos = data[i].xPos;
			const yPos = data[i].yPos;
			const displayConfig = data[i].displayConfig;
	
			//console.log(data[i]);
			render(xPos,yPos,displayConfig,ctx);	
		}

		console.log("Done rendering");
	}
}

let canvasRender;

export function init(){
	canvasRender = new CanvasRender();	
}
