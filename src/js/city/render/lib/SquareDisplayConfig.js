export function drawSquare({ xPos, yPos, displayConfig, id, ctx }) {
	//TODO: Add logic for drawing square.
}

const DEFAULT_SQUARE_CONFIG = {
  color: "#000000",
  shapeType: "square",
  size: 5,
	zIndex: -1
};

export function createDefaultSquareConfig() {
  return structuredClone(DEFAULT_SQUARE_CONFIG);
}
