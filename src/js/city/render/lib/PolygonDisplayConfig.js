export function drawPolygon({ xPos, yPos, displayConfig, id, ctx }) {
  
	const points = displayConfig.points;

	ctx.beginPath();
	ctx.moveTo(
		xPos+points[0].xPos,
		yPos+points[0].yPos
	);

	for(let i=1;i<points.length;i++){
		ctx.moveTo(
			xPos+points[i].xPos,
			yPos+points[i].yPos
		);
	}

	ctx.fillStyle = displayConfig.color;
	ctx.fill();

}

//Create a rotated rectange with angle specified in 
//radians
export function createRotatedRectConfig({angle,height,width}){
	const config  = {
		color: "#000000",
		shapeType: "polygon",
	}

	const distance = Math.hypot(height,width);

	const edgeTan = height/width;

	const edgeAngleA = Math.atan(edgeTan);
	const edgeAngleB = Math.PI - edgeAngleA;
	const edgeAngleC = Math.PI + edgeAngleA;
	const edgeAngleD = 2*Math.PI - edgeAngleA;

	const points = [
		edgeAngleA,
		edgeAngleB,
		edgeAngleC,
		edgeAngleD
	]		

	const rotated = [];	
	
	for(let i=0;i<4;i++){
		
		const updatedAngle = points[i]+ angle;	
		const updatedTan = Math.tan(updatedAngle);

		rotated.push({
			xPos: distance*Math.cos(angle),
			yPos: distance*Math.sin(angle)
		})
	}

	config.points = rotated;
}

export function createDefaultSquareConfig() {
  return structuredClone(DEFAULT_SQUARE_CONFIG);
}
