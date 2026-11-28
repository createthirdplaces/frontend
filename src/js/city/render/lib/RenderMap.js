import { drawCircle } from "./CircleDisplayConfig.js";
import { drawPolygon} from "./PolygonDisplayConfig.js";
import { drawSquare } from "./SquareDisplayConfig.js";

export function render(params) {
  if (!params.displayConfig.shapeType) {
    throw new Error("No shape type defined");
  }

  const shapeType = params.displayConfig.shapeType;

  if (shapeType === "circle") {
    drawCircle(params);
  } else if(shapeType === "polygon"){
		drawPolygon(params);	
	} else if (shapeType === "square") {
    drawSquare(params);
  } else {
    throw new Error(`No renderer defined for shape type ${shapeType}`);
  }
}
