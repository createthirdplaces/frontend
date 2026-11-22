
export function drawCircle({xPos,yPos,displayConfig,id,ctx}){
  
  ctx.strokeStyle = "white";
	ctx.beginPath();
	ctx.arc(
		xPos,
		yPos,
		displayConfig.radius,
		0,
		2 * Math.PI);

  ctx.fillStyle = displayConfig.color;
	ctx.fill();

}

const DEFAULT_CIRCLE_CONFIG = {
	color:"#000000",
	shapeType: "circle",
	radius:5
}

export function createDefaultCircleConfig(){
	return structuredClone(DEFAULT_CIRCLE_CONFIG);
}

