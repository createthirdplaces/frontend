
export function drawCircle(xPos,yPos,displayConfig,ctx){

	ctx.beginPath();
	ctx.arc(
		xPos,
		yPos,
		200,
		//displayConfig.radius,
		0,
		2 * Math.PI);

	console.log(xPos+":"+yPos);

	//TODO: Make sure hexadecimal config is working for color.
	//Afterwards, make sure radius is not hardcoded and display updates	
	ctx.fillStyle = "red";
	ctx.fill();
	ctx.lineWith = 2;
	ctx.strokeStyle = "black";
	ctx.stroke();

}

const DEFAULT_CIRCLE_CONFIG = {
	color:"#000000",
	shapeType: "circle",
	radius:20
}

export function createDefaultCircleConfig(){
	return structuredClone(DEFAULT_CIRCLE_CONFIG);
}

