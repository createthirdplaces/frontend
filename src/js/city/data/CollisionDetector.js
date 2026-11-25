let coordinateMap = new Map();
let collisionMap = [];

const width = 1000;
const height = 1000;

const cellSize = 10;

let mapWidth = Math.ceil(width/cellSize);
let mapHeight = Math.ceil(height/cellSize);

const initMap = ()=>{
	for(let x=0;x<width;x+=cellSize){	

		const col = [];
		for(let y=0;y<height;y+=cellSize){
			col.push(new Map());
		}
		collisionMap.push(col);
	}
}

initMap();

class CollisionDetector {

	#config

	constructor(config){
		this.#config = config;
	}


	//TODO: Update to exclude small cells in corners
	// when entities are large circles.
	
	hasCollision(xPos,yPos,id, radius){

		const centerX = Math.floor(xPos/cellSize);
		const centerY = Math.floor(yPos/cellSize);

		const startX = Math.max(
			0,
			Math.floor(centerX-radius/cellSize))

		const endX = Math.min(
			mapWidth,
			Math.ceil(centerX+radius/cellSize))

		const startY = Math.max(
			0,
			Math.floor(centerY-radius/cellSize))

		const endY = Math.max(
			0,
			Math.ceil(centerY-radius/cellSize))
	
		for(let x=startX;x<endX;x++){
			for(let y=startY;y<endY;y++){
				hasCollision = false;
				
				collisionMap[x][y].forEach((value,key)=>{
					if(key !== id){
						
						const distance = Math.sqrt(
							Math.pow(Math.abs(value.xPos-xPos),2) +
							Math.pow(Math.abs(value.yPos-yPos),2)
						)

						if(distance < (radius + value.radius)){
							hasCollision = true;
						}
					}
				});
				if(hasCollision){
					return true;
				}
			}
		}
		return false;
	}
	
	
	updateCollisionMap({xPos,yPos,id,radius}){

		const x = Math.floor(xPos/cellSize);
		const y = Math.floor(yPos/cellSize);

		if(coordinateMap.has(id)){
			const oldX = coordinateMap.get(id).xPos;
			const oldY = coordinateMap.get(id).yPos;
			collisionMap[oldX][oldY].delete(id);
		}

		coordinateMap.set(id,{xPos:xPos,yPos:yPos});		

		collisionMap[x][y]= {
			radius,
			xPos,
			yPos,
		}
	}

}

export function createCollisionDetector(config){
	return new CollisionDetector(config);
	
}
