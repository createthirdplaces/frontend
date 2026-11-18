import {DataStore,EmptyInitializer} from '/js/shared/lib/places-js-latest.js';

//Debouncing for updates

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

export const PLACE_UPDATER = new PlaceUpdater();

export const RENDER_STORE = DataStore.createWithInitialState({
	initialState:{},
	storeName = "render-store";
});
