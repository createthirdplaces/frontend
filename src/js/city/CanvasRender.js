import {FRAMES_PER_SECOND,PLACE_STORE} from './PlaceUpdater.js'

import {render} from './render/RenderMap.js';

class CanvasRender{

  self;

  #offscreenCanvas;

	constructor() {
		PLACE_STORE.subscribeWithCallback(this.update);

    const drawCanvas = document.getElementById("simulation-display");
    this.#offscreenCanvas = document.createElement("canvas");
    this.#offscreenCanvas.width = drawCanvas.width;
    this.#offscreenCanvas.height = drawCanvas.height;
    self = this;
	}

	update(updates){


    const ctx = self.#offscreenCanvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,1000,1000);

      /**
        TODO: Add clear() method for DisplayConfig if item needs to be re-rendered. This will allow canvas to only redraw items that have moved.
      **/

    const data = updates.updates;

    for(let i=0;i<data.length;i++){
  
      const xPos = data[i].xPos;
      const yPos = data[i].yPos;
      const displayConfig = data[i].displayConfig;
 
      render({
        xPos,
        yPos,
        displayConfig,
        id:data[i].id,
        ctx
      });	
    }

    requestAnimationFrame((timestamp)=>{ 
    
      const canvas = document.getElementById("simulation-display");

      canvas.getContext("2d")
        .drawImage(self.#offscreenCanvas,0,0);
      self.prevTimestamp = timestamp;
    });
	}
}

let canvasRender;

export function init(){
	canvasRender = new CanvasRender();	
}
