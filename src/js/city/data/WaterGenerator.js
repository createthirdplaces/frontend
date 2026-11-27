import {NO_MOVE_UPDATER} from "./move/NoMoveUpdater.js";

import {Entity} from "../Entity.js";

import {createErrorHandler} from "../ErrorHandler.js";

import {createCollisionDetector} from "./CollisionDetector.js"
import {createDefaultSquareConfig} from "../render/lib/SquareDisplayConfig.js";

const DEFAULT_RIVER_WIDTH=50;
/*
	Create river as static 5 by 5 pixel
	squares representing static entities
*/
export function createRiver({
	mapHeight,
	mapWidth
}){

	let riverEntities = [];

	let midPoint = mapWidth/2;

	let xChange = Math.floor(Math.random()*2);

	let xPos = midPoint;
	let yPos = 0;

	if(xChange === 1){
		xChange = 2;
	} else {
		xChange = -2;
	}

	while(yPos < mapHeight){
			
		let minAcc = -1;
		let maxAcc = 1;

		let intertia = 50/(midPoint - xPos);
		let acc = Math.random*2 -1;
		
		xChange +=acc;

		for(let x = xPos-DEFAULT_RIVER_WIDTH/2;x<xPos+DEFAULT_RIVER_WIDTH/2;x+=5){
		
			const displayConfig = createDefaultSquareConfig();	
			displayConfig.color = "#68A0B0";
			const riverEntity = new Entity({
				collisionDetector:createCollisionDetector({radius:5}),
				displayConfig: createDefaultSquareConfig(),	
				errorHandler: createErrorHandler(),	
				moveUpdater: NO_MOVE_UPDATER,
				xPos: x,
				yPos: yPos
			});
			riverEntities.push(riverEntity);
		}
		yPos +=5;
	}

	return riverEntities;

}
