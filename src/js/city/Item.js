export class Item {

	#moveUpdater;
	
	#displayConfig;
	#xPos;
	#yPos;

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

		setInterval(()=>{
			const newLoc = this.#moveUpdater.update(this.#xPos,this.#yPos);	
			this.#xPos = newLoc.xPos;
			this.#yPos = newLoc.yPos;
		},moveUpdater.getUpdatesPerSecond())	
	}

}
