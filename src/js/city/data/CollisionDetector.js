import {CELL_SIZE,DISPLAY_HEIGHT,DISPLAY_WIDTH} from "../Config.js"

let coordinateMap = new Map();
let collisionMap = [];

let mapWidth = Math.ceil(DISPLAY_WIDTH / CELL_SIZE);
let mapHeight = Math.ceil(DISPLAY_HEIGHT / CELL_SIZE);

let lastCheckTime = Date.now();
let lastSize = 0;
const collisionMapSize = () => {
  if (Date.now() - lastCheckTime < 1000) {
    return lastSize;
  }
  let size = 0;
  for (let x = 0; x * CELL_SIZE < DISPLAY_WIDTH; x++) {
    for (let y = 0; y * CELL_SIZE < DISPLAY_HEIGHT; y++) {
      size += collisionMap[x][y].size;
    }
  }

  lastCheckTime = Date.now();
  console.log(size);
  return size;
};

const initMap = () => {
  for (let x = 0; x < DISPLAY_WIDTH; x += CELL_SIZE) {
    const col = [];
    for (let y = 0; y < DISPLAY_HEIGHT; y += CELL_SIZE) {
      col.push(new Map());
    }
    collisionMap.push(col);
  }
};

initMap();

const DEFAULT_RANDOM_MAX = 5;

class CollisionDetector {
  #config;

  constructor(config) {
    this.#config = config;
  }

  generateEmptyPoint({ height, width, checks }) {
    const radius = this.#config.radius;
    const maxChecks = checks ?? DEFAULT_RANDOM_MAX;
    for (let i = 0; i < maxChecks; i++) {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);

      if (
        !this.hasCollision({
          radius: radius,
          xPos: x,
          yPos: y,
        })
      )
        return { xPos: x, yPos: y };
    }
  }

  hasCollision({ xPos, yPos, id }) {
    const radius = this.#config.radius;
    const centerX = Math.floor(xPos / CELL_SIZE);
    const centerY = Math.floor(yPos / CELL_SIZE);

    const startX = Math.max(0, Math.floor(centerX - radius / CELL_SIZE));

    const endX = Math.min(mapWidth, Math.ceil(centerX + radius / CELL_SIZE));

    const startY = Math.max(0, Math.floor(centerY - radius / CELL_SIZE));

    const endY = Math.min(mapHeight, Math.ceil(centerY + radius / CELL_SIZE));

    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        let hasCollision = false;

        collisionMap[x][y].forEach((value, key) => {
          if (key !== id) {
            const distance = Math.sqrt(
              Math.pow(Math.abs(value.xPos - xPos), 2) +
                Math.pow(Math.abs(value.yPos - yPos), 2),
            );

            if (distance < radius + value.radius) {
              hasCollision = true;
            }
          }
        });
        if (hasCollision) {
          return true;
        }
      }
    }
    return false;
  }

  updateCollisionMap({ xPos, yPos, id }) {
    const radius = this.#config.radius;
    if (!id && id !== 0) {
      throw new Error("Invalid id ${id} for collision map");
    }
    const centerX = Math.floor(xPos / CELL_SIZE);
    const centerY = Math.floor(yPos / CELL_SIZE);

    if (coordinateMap.has(id)) {
      const oldCenterX = Math.floor(coordinateMap.get(id).xPos / CELL_SIZE);
      const oldCenterY = Math.floor(coordinateMap.get(id).yPos / CELL_SIZE);

      //Delete old positions for collision map.
      const oldStartX = Math.max(0, Math.floor(oldCenterX - radius / CELL_SIZE));

      const oldEndX = Math.min(
        mapWidth,
        Math.ceil(oldCenterX + radius / CELL_SIZE),
      );

      const oldStartY = Math.max(0, Math.floor(oldCenterY - radius / CELL_SIZE));

      const oldEndY = Math.max(0, Math.ceil(oldCenterY - radius / CELL_SIZE));

      for (let x = oldStartX; x < oldEndX; x++) {
        for (let y = oldStartY; y < oldEndY; y++) {
          collisionMap[x][y].delete(id);
        }
      }
    }

    coordinateMap.set(id, { xPos: xPos, yPos: yPos });

    const startX = Math.max(0, Math.floor(centerX - radius / CELL_SIZE));

    const endX = Math.min(mapWidth, Math.ceil(centerX + radius / CELL_SIZE));

    const startY = Math.max(0, Math.floor(centerY - radius / CELL_SIZE));

    const endY = Math.max(0, Math.ceil(centerY - radius / CELL_SIZE));

    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        collisionMap[x][y].set(id, {
          radius,
          xPos,
          yPos,
        });
      }
    }
  }
}

export function createCollisionDetector(config) {
  return new CollisionDetector(config);
}
