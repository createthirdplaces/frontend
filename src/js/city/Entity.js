import {PLACE_UPDATER} from './PlaceUpdater.js';

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
		displayConfig,
		moveUpdater})
	{
		this.#displayConfig = displayConfig;
		
		this.#id = Entity.numCreated;
		Entity.numCreated++;

		this.#moveUpdater = moveUpdater;
		this.#xPos = xPos;
		this.#yPos = yPos;

		setInterval(()=>{
			const newLoc = this.#moveUpdater.update(this.#xPos,this.#yPos,this.#id);	
			this.#xPos = newLoc.xPos;
			this.#yPos = newLoc.yPos;

			PLACE_UPDATER.update({
				displayConfig:this.#displayConfig,	
				id: this.#id,
				xPos: this.#xPos,
				yPos: this.#yPos,
			});
		},moveUpdater.getUpdatesPerSecond())		
	}
}
