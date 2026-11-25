import { PLACE_UPDATER } from "./PlaceUpdater.js";

class EmptyCollisionDetector {
  hasCollision() {
    return false;
  }
}

const emptyCollisionDetector = new EmptyCollisionDetector();

export class Entity {
  static numCreated = 0;

  #displayConfig;

  #id;
  #moveUpdater;
  #radius;
  #xPos;
  #yPos;

  constructor({
    xPos,
    yPos,
    collisionDetector,
    errorHandler,
    displayConfig,
    moveUpdater,
  }) {
    this.#displayConfig = displayConfig;

    this.#id = Entity.numCreated;
    Entity.numCreated++;

    this.#moveUpdater = moveUpdater;
    this.#radius = this.#displayConfig.radius;
    this.#xPos = xPos;
    this.#yPos = yPos;

    const pid = setInterval(() => {
      try {
        const newLoc = this.#moveUpdater.update({
          id: this.#id,
          collisionDetector: collisionDetector ?? emptyCollisionDetector,
          radius: this.#radius,
          xPos: this.#xPos,
          yPos: this.#yPos,
        });
        this.#xPos = newLoc.xPos;
        this.#yPos = newLoc.yPos;

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
