class CircleDisplayConfig {
	
	#color;
	#radius;

	constructor(config){
		this.#color = config.color;
		this.#radius = config.radius;
	}
	
	draw(xPos,yPos,ctx){

		ctx.beginPath();
		ctx.arc(
			xPos,
			yPos,
			this.#radius,
			2 * Math.PI);
		ctx.fillStyle = this.#color;
		ctx.fill();
		ctx.lineWith = 2;
		ctx.strokeStyle = "black";
		ctx.stroke;	
	}
}

const DEFAULT_CONFIG = {
	color:"#000000",
	radius:20
}
export const DEFAULT_CIRCLE_DISPALY_CONFIG 
	= new CircleDisplayConfig(DEFAULT_CONFIG);
