
import {render} from './RenderMap.js';

class CanvasRender{

  self;

  #drawCanvasId;
  #offscreenCanvas;

  //TODO: Pass parameters instead of hardcoding them.
  // This will decouple the rendering logic from logic specific to city
  // simulator.
	constructor(config) {
		config.store.subscribeWithCallback(this.update);

    const drawCanvas = document.getElementById(config.canvasId);
    if(!drawCanvas){
      throw new Error(`Invalid canvasId ${config.canvasId}`);
    }

    this.#drawCanvasId = config.canvasId;
    this.#offscreenCanvas = document.createElement("canvas");
    this.#offscreenCanvas.width = drawCanvas.width;
    this.#offscreenCanvas.height = drawCanvas.height;
    self = this;
	}

	update(updates){

    const ctx = self.#offscreenCanvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,1000,1000);
    
    const data = updates.updates;

		//TODO: Draw by z index. Default should be 0.
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
   
      const canvas = document.getElementById(self.#drawCanvasId);
      canvas.getContext("2d")
        .drawImage(self.#offscreenCanvas,0,0);
      self.prevTimestamp = timestamp;
    });
	}
}

let canvasRender;

export function init(config){
	canvasRender = new CanvasRender(config);	
}
