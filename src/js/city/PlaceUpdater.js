import {DataStore,EmptyInitializer} from '/js/shared/lib/places-js-latest.js';


const FRAMES_PER_SECOND = 60.0;


class PlaceUpdater {

	#updates;

	constructor(){
		this.#updates = [];
	}

	start(){
		setInterval(()=>{
			
			PLACE_STORE.updateStoreData(this.#updates);

			this.#updates.clear();	
		},1000/FRAMES_PER_SECOND);
	}

	update(itemConfig){
		this.#updates.push(itemConfig);
	}

}


/* Debouncing for updates
 * All requests to update the simulation state should be made to PLACE_UPDATER
*/
export const PLACE_UPDATER = new PlaceUpdater();

/*
	This stores the current simulation data. Data is then passed to a renderer for a visual display. 

	If an object in the simulation are dependent on the simulation data, then the object should have a store subscribed to this store. 
*/
export const PLACE_STORE = DataStore.createWithInitialState({
	initialState:{},
	storeName = "place-store";
});
