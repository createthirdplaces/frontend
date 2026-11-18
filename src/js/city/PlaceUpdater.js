import {DataStore} from '/js/shared/lib/places-js-v0-1-2.js';


const FRAMES_PER_SECOND = 1;


class PlaceUpdater {

	#updates;

	constructor(){
		this.#updates = [];
	}

	start(){
		setInterval(()=>{
		
			let updatesToSave = [];
			for(let i=0;i<this.#updates.length;i++){
				updatesToSave.push(this.#updates[i]);
			}

			//console.log(updatesToSave);
			PLACE_STORE.updateStoreData({
				updates:updatesToSave
			});
			this.#updates = [];	
		},1000/FRAMES_PER_SECOND);
	}

	update(itemConfig){
		//console.log("update");
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
console.log(DataStore);
export const PLACE_STORE = DataStore.createWithInitialState({
	initialState:{},
	storeName:"place-store"
});
