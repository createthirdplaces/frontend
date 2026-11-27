export function drawSquare({ xPos, yPos, displayConfig, id, ctx }) {
	ctx.fillStyle = displayConfig.color;
	ctx.fillRect(xPos,yPos,displayConfig.size, displayConfig.size);
}

const DEFAULT_SQUARE_CONFIG = {
  color: "#000000",
  shapeType: "square",
  size: 5,
};

export function createDefaultSquareConfig() {
  return structuredClone(DEFAULT_SQUARE_CONFIG);
}
