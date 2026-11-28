import { CANVAS_ID, DISPLAY_HEIGHT, DISPLAY_WIDTH } from "./Config.js";
import { NO_MOVE_UPDATER } from "./data/move/NoMoveUpdater.js";
import { PLACE_STORE, PLACE_UPDATER } from "./PlaceUpdater.js";
import { PERSON_ENTITY } from "/js/city/data/EntityTypes.js";
import { RANDOM_UPDATER } from "./data/move/RandomUpdater.js";

import { Entity } from "./data/Entity.js";

import { createCollisionDetector } from "./data/CollisionDetector.js";
import { createDefaultCircleConfig } from "./render/lib/CircleDisplayConfig.js";
import { createLogger } from "./Logger.js";
import { createRiver } from "./data/WaterGenerator.js";
import { init } from "./render/lib/CanvasRender.js";

let entities = [];

export function startSimulation() {
  entities.concat(
    createRiver({
      mapHeight: DISPLAY_HEIGHT,
      mapWidth: DISPLAY_WIDTH,
    }),
  );

  const spawnCollisionDetector = createCollisionDetector({ radius: 3 });

  for (let i = 0; i < 1000; i++) {
    const spawnLoc = spawnCollisionDetector.generateEmptyPoint({
      height: DISPLAY_HEIGHT,
      width: DISPLAY_WIDTH,
    });

    if (!spawnLoc) {
      continue;
    }
    let xPos = spawnLoc.xPos;
    let yPos = spawnLoc.yPos;

    const config = createDefaultCircleConfig();
    const errorHandler = createLogger();
    if (xPos > DISPLAY_WIDTH / 2) {
      config.color = "#008000";
    } else {
      config.color = "#800080";
    }

    entities.push(
      new Entity({
        collisionDetector: createCollisionDetector({ radius: 5 }),
        displayConfig: config,
        entityType: PERSON_ENTITY,
        errorHandler: errorHandler,
        moveUpdater: RANDOM_UPDATER,
        xPos: xPos,
        yPos: yPos,
      }),
    );
  }

  PLACE_UPDATER.start();
  init({
    canvasId: CANVAS_ID,
    displayHeight: DISPLAY_HEIGHT,
    displayWidth: DISPLAY_WIDTH,
    store: PLACE_STORE,
  });
}
