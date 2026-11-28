import { render } from "./RenderMap.js";

class CanvasRender {
  self;

  #drawCanvasId;
  #offscreenCanvas;

  //TODO: Pass parameters instead of hardcoding them.
  // This will decouple the rendering logic from logic specific to city
  // simulator.
  constructor(config) {
    config.store.subscribeWithCallback(this.update);

    const drawCanvas = document.getElementById(config.canvasId);
    if (!drawCanvas) {
      throw new Error(`Invalid canvasId ${config.canvasId}`);
    }

    this.#drawCanvasId = config.canvasId;
    this.#offscreenCanvas = document.createElement("canvas");
    this.#offscreenCanvas.width = drawCanvas.width;
    this.#offscreenCanvas.height = drawCanvas.height;
    self = this;
  }

  update(updates) {
    const ctx = self.#offscreenCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1000, 1000);

    const data = updates.updates;
		const layers = [];
		const zIndexMap = new Map();

		for(let i=0;i<data.length;i++){
			const zIndex = data[i].displayConfig.zIndex ?? 0;

			if(!zIndexMap.has(zIndex)){
				zIndexMap.set(zIndex,[]);
				layers.push(parseInt(zIndex));
			}
			
			zIndexMap.get(zIndex).push(data[i]);	
		}

		layers.sort((a,b)=>{return a-b});

		for(let i=0; i < layers.length; i++){
			const layerIndex = layers[i];
			const layerData = zIndexMap.get(layerIndex);

			for (let j = 0; j < layerData.length; j++) {

				if(!layerData[j]){
					console.log(j);
					console.log(layerData);
				}
				const xPos = layerData[j].xPos;
				const yPos = layerData[j].yPos;
				const displayConfig = layerData[j].displayConfig;

				render({
					xPos,
					yPos,
					displayConfig,
					id: layerData[j].id,
					ctx,
				});
			}
		}


    requestAnimationFrame((timestamp) => {
      const canvas = document.getElementById(self.#drawCanvasId);
      canvas.getContext("2d").drawImage(self.#offscreenCanvas, 0, 0);
      self.prevTimestamp = timestamp;
    });
  }
}

let canvasRender;

export function init(config) {
  canvasRender = new CanvasRender(config);
}
