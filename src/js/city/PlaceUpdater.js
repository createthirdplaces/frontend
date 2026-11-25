import { DataStore } from "/js/shared/lib/places-js-v0-1-2.js";

import { FRAMES_PER_SECOND } from "./Config";

class PlaceUpdater {
  #updates;

  constructor() {
    this.#updates = new Map();
  }

  start() {
    setInterval(() => {
      let updatesToSave = [];

      this.#updates.forEach((value) => {
        updatesToSave.push(value);
      });

      PLACE_STORE.updateStoreData({
        updates: updatesToSave,
      });
    }, 1000 / FRAMES_PER_SECOND);
  }

  update(itemConfig) {
    //If multiple updates are made to the same object, only
    //apply the latest one.
    //This also means that if an item is not updated during a			//a render cycle, data  from the last update will
    //be used.
    this.#updates.set(itemConfig.id, itemConfig);
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
  initialState: {},
  storeName: "place-store",
});
