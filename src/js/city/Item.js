import {PLACE_UPDATER} from 'PlaceUpdater.js';

export class Item {

	static #id = 0;
		
	#displayConfig;
	#id;
	#moveUpdater;
	#xPos;
	#yPos;

	/**
	 TODO: Add updater for state metrics with
	  the results being passed to PLACE_UPDATER.
	**/
	constructor(
		xPos,
		yPos,
		displayConfig,
		moveUpdater)
	{
		this.#displayConfig = displayConfig;
		this.#moveUpdater = moveUpdater;
		this.#xPos = xPos;
		this.#yPos = yPos;

		this.#id = Item.id;
		Item.id ++;

		setInterval(()=>{
			const newLoc = this.#moveUpdater.update(this.#xPos,this.#yPos);	
			this.#xPos = newLoc.xPos;
			this.#yPos = newLoc.yPos;
		},moveUpdater.getUpdatesPerSecond())	

	
		PLACE_UPDATER.update({
			displayConfig:this.#displayConfig,
			xPos: this.#xPos,
			yPos: this.#yPos,
			id: this.id
		});
	}

}
