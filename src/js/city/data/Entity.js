import { DEFAULT_ENTITY } from "/js/city/data/EntityTypes.js"
import { PLACE_UPDATER } from "../PlaceUpdater.js";

class EmptyCollisionDetector {
  hasCollision() {
    return false;
  }
  updateCollisionMap() {}
}

const emptyCollisionDetector = new EmptyCollisionDetector();

export class Entity {
  static numCreated = 0;

  #collisionDetector;
  #displayConfig;
	#entityType;
  #id;
  #moveUpdater;
  #radius;
  #xPos;
  #yPos;

  constructor({
    collisionDetector, 
    displayConfig,
		entityType,
		errorHandler,
    moveUpdater,
		 xPos,
    yPos,
  }) {
    this.#displayConfig = displayConfig;

		this.#entityType = entityType ?? DEFAULT_ENTITY;
    this.#id = Entity.numCreated;
    Entity.numCreated++;

    this.#moveUpdater = moveUpdater;
    this.#radius = this.#displayConfig.radius;
    this.#xPos = xPos;
    this.#yPos = yPos;

    this.#collisionDetector = collisionDetector ?? emptyCollisionDetector;
    this.#collisionDetector.updateCollisionMap({
      id: this.#id,
      radius: this.#radius,
      xPos: this.#xPos,
      yPos: this.#yPos,
    });

    const pid = setInterval(() => {
      try {
        const newLoc = this.#moveUpdater.update({
          id: this.#id,
          collisionDetector: this.#collisionDetector,
          radius: this.#radius,
          xPos: this.#xPos,
          yPos: this.#yPos,
        });

        //An entity may not change position.
        if (newLoc) {
          this.#xPos = newLoc.xPos;
          this.#yPos = newLoc.yPos;
        }

        PLACE_UPDATER.update({
          displayConfig: this.#displayConfig,
          id: this.#id,
          xPos: this.#xPos,
          yPos: this.#yPos,
        });
      } catch (e) {
        errorHandler.handleError({
          errorData: e,
          intervalPid: pid,
          message: `Error when updating entity #${this.#id}`,
        });
      }
    }, 1000 / moveUpdater.getUpdatesPerSecond());
  }
}
