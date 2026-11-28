import { BACKGROUND_Z_INDEX, CELL_SIZE } from "../Config.js";
import { NO_MOVE_UPDATER } from "./move/NoMoveUpdater.js";
import { BRIDGE_ENTITY, WATER_ENTITY } from "/js/city/data/EntityTypes.js";
import { Entity } from "/js/city/data/Entity.js";

import { createCollisionDetector } from "./CollisionDetector.js";
import { createDefaultSquareConfig } from "../render/lib/SquareDisplayConfig.js";
import { createRotatedRectConfig } from "/js/city/render/lib/PolygonDisplayConfig.js";
import { createLogger } from "../Logger.js";

const DEFAULT_RIVER_WIDTH = 100;

//Determine how much the midpoint will adjust.
const MIDPOINT_ADJUST_RATE = 0.01;

const RIVER_CELL_SIZE = CELL_SIZE / 2;
const Y_CHANGE = RIVER_CELL_SIZE;

const generateBridgeEntity = (config) => {
  const { angle, length, width, xPos, yPos } = config;

  const bridgeConfig = createRotatedRectConfig({
    angle,
    length,
    width,
  });

  bridgeConfig.color = "#da6d42";
  bridgeConfig.zIndex = BACKGROUND_Z_INDEX + 1;

  const bridgeEntity = new Entity({
    collisionDetector: createCollisionDetector({ radius: RIVER_CELL_SIZE }),
    displayConfig: bridgeConfig,
    entityType: BRIDGE_ENTITY,
    errorHandler: createLogger(),
    moveUpdater: NO_MOVE_UPDATER,
    xPos: Math.floor(xPos),
    yPos: Math.floor(yPos),
  });

  return bridgeEntity;
};

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

  let lastBridgePos = 0;

  while (yPos < mapHeight) {
    let inertia = 0;
    let maxAcc = 1;
    let minAcc = -1;

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

    let createBridge = true;
    if (yPos - lastBridgePos <= 500) {
      for (let i = 0; i < 4; i++) {
        const roll = Math.random();
        if (roll > (yPos - lastBridgePos) / 500) {
          createBridge = false;
        }
      }
    }

    if (createBridge) {
      let bridgeAngle = -1 * Math.acos(5 / diagonalWidth);
      if (xChange < 0) {
        bridgeAngle = -1 * bridgeAngle;
      }

      const bridgeConfig = {
        angle: bridgeAngle,
        length: 100,
        width: 20,
        xPos: xPos,
        yPos: yPos,
      };
      riverEntities.push(generateBridgeEntity(bridgeConfig));
      lastBridgePos = yPos;
    }

    for (let x = xPos - width / 2; x < xPos + width / 2; x += RIVER_CELL_SIZE) {
      const displayConfig = createDefaultSquareConfig();
      displayConfig.color = "#68A0B0";
      displayConfig.zIndex = BACKGROUND_Z_INDEX;
      const riverEntity = new Entity({
        collisionDetector: createCollisionDetector({ radius: RIVER_CELL_SIZE }),
        displayConfig: displayConfig,
        entityType: WATER_ENTITY,
        errorHandler: createLogger(),
        moveUpdater: NO_MOVE_UPDATER,
        xPos: x - (x % RIVER_CELL_SIZE),
        yPos: yPos,
      });
      riverEntities.push(riverEntity);
    }
    xPos += xChange;
    yPos += Y_CHANGE;
  }

  return riverEntities;
}
