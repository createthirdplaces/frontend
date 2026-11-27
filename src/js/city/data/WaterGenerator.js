import { NO_MOVE_UPDATER } from "./move/NoMoveUpdater.js";

import { Entity } from "../Entity.js";

import { createErrorHandler } from "../ErrorHandler.js";

import { createCollisionDetector } from "./CollisionDetector.js";
import { createDefaultSquareConfig } from "../render/lib/SquareDisplayConfig.js";

const DEFAULT_RIVER_WIDTH = 100;

//Determine how much the midpoint will adjust.
const MIDPOINT_ADJUST_RATE = 0.01;

const Y_CHANGE = 5;
/*
	Create river as static 5 by 5 pixel
	squares representing static entities
*/
export function createRiver({ mapHeight, mapWidth }) {
  //TOOD: Adjust midpoint of river
  let riverEntities = [];

  let midPoint = mapWidth / 2;

  let xChange = Math.floor(Math.random() * 2);

  let xPos = midPoint;
  let yPos = 0;

  if (xChange === 1) {
    xChange = 5;
  } else {
    xChange = -5;
  }

  while (yPos < mapHeight) {
    let minAcc = -1;
    let maxAcc = 1;

    let inertia = 0;
    if (midPoint !== xPos) {
      inertia = (midPoint - xPos) / 500;

      const midPointAdjust = (midPoint - xPos) * MIDPOINT_ADJUST_RATE;
      midPoint += midPointAdjust;
    }
    let acc = Math.random() * 2 - 1;

    xChange += acc + inertia;

    let width = DEFAULT_RIVER_WIDTH;

    const diagonalWidth = Math.sqrt(
      Math.pow(Y_CHANGE, 2) + Math.pow(xChange, 2),
    );

    width = (width * diagonalWidth) / 5;

    for (let x = xPos - width / 2; x < xPos + width / 2; x += 5) {
      const displayConfig = createDefaultSquareConfig();
      displayConfig.color = "#68A0B0";
      const riverEntity = new Entity({
        collisionDetector: createCollisionDetector({ radius: 5 }),
        displayConfig: displayConfig,
        errorHandler: createErrorHandler(),
        moveUpdater: NO_MOVE_UPDATER,
        xPos: x - (x % 5),
        yPos: yPos,
      });
      riverEntities.push(riverEntity);
    }
    xPos += xChange;
    yPos += Y_CHANGE;
  }

  return riverEntities;
}
