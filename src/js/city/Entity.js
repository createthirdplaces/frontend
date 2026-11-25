import {PLACE_UPDATER} from './PlaceUpdater.js';

class EmptyCollisionDetector {
	hasCollision(){
		return false;
	}
}

const emptyCollisionDetector = new EmptyCollisionDetector();


export class Entity {

	static numCreated = 0;
	
	#displayConfig;
	#id;
	#moveUpdater;
	#xPos;
	#yPos;

	constructor({
		xPos,
		yPos,
		collisionDetector,
		errorHandler,
		displayConfig,
		moveUpdater})
	{
		this.#displayConfig = displayConfig;
		
		this.#id = Entity.numCreated;
		Entity.numCreated++;

		this.#moveUpdater = moveUpdater;
		this.#xPos = xPos;
		this.#yPos = yPos;

		const pid = setInterval(()=>{
			try {
				const newLoc = this.#moveUpdater.update({	
					id:this.#id,
					collisionDetector: collisionDetector??emptyCollisionDetector,
					xPos:this.#xPos,
					yPos:this.#yPos,
				});	
				this.#xPos = newLoc.xPos;
				this.#yPos = newLoc.yPos;

				PLACE_UPDATER.update({
					displayConfig:this.#displayConfig,	
					id: this.#id,
					xPos: this.#xPos,
					yPos: this.#yPos,
				});
			} catch(e) {
				errorHandler.handleError({
					errorData:e,
					intervalPid: pid,
					message: `Error when updating entity #${this.#id}`	
				});
			}
		},moveUpdater.getUpdatesPerSecond())		
	}
}
