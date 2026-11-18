import {RENDER_STORE} from 'RenderStore.js'
class CanvasRender(){


	constructor() {
		RENDER_STORE.subscribeWithCallback(this.update);
	}

	update(data){

		const canvas = document.getElementById("simulation-display");
		const ctx = canvas.getContext("2d");
		
		ctx.fillStyle="white";
		ctx.clearReact(0,0,1000,1000);
		/**
			TODO: Add clear() method for DisplayConfig if item needs to be re-rendered. This will allow canvas to only redraw items that have moved.

		**/
		for(let i=0;i<data.length;i++){
				
			const xPos = data[i].xPos;
			const yPos = data[i].yPos;
			const displayConfig = data[i].displayConfig;
			
			const displayData = displayConfig.generateUpdateForPos(xPos,yPos);
		
			displayConfig.draw(xPos,yPos,ctx);
			
		}
	}
}

let canvasRender;

export function init(){
	canvasRender = new CanvasRender();	
}
