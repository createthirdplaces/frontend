import { drawCircle } from "./CircleDisplayConfig.js";

export function render(params) {
  if (!params.displayConfig.shapeType) {
    throw new Error("No shape type defined");
  }

  const shapeType = params.displayConfig.shapeType;

  if (shapeType === "circle") {
    drawCircle(params);
  } else {
    throw new Error(`No renderer defined for shape type ${shapeType}`);
  }
}
