
import {drawCircle} from './CircleDisplayConfig.js';


export function render(xPos,yPos,renderConfig,ctx){
	if(!renderConfig.shapeType){
		throw new Error("No shape type defined");
	}

	const shapeType = renderConfig.shapeType;
	
	if(shapeType === "circle"){
		drawCircle(xPos,yPos,renderConfig,ctx);
	}
	else {
		throw new Error(`No renderer defined for shape type ${shapeType}`);
	}

}
