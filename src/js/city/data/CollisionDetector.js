let coordinateMap = new Map();
let collisionMap = [];

const width = 1000;
const height = 1000;

const cellSize = 10;

let mapWidth = Math.ceil(width / cellSize);
let mapHeight = Math.ceil(height / cellSize);

let lastCheckTime = Date.now();
let lastSize = 0;
const collisionMapSize = () => {
  if (Date.now() - lastCheckTime < 1000) {
    return lastSize;
  }
  let size = 0;
  for (let x = 0; x * cellSize < width; x++) {
    for (let y = 0; y * cellSize < height; y++) {
      size += collisionMap[x][y].size;
    }
  }

  lastCheckTime = Date.now();
  console.log(size);
  return size;
};

const initMap = () => {
  for (let x = 0; x < width; x += cellSize) {
    const col = [];
    for (let y = 0; y < height; y += cellSize) {
      col.push(new Map());
    }
    collisionMap.push(col);
  }
};

initMap();

class CollisionDetector {
  #config;

  constructor(config) {
    this.#config = config;
  }

  hasCollision({ xPos, yPos, id, radius }) {
    const centerX = Math.floor(xPos / cellSize);
    const centerY = Math.floor(yPos / cellSize);

    const startX = Math.max(0, Math.floor(centerX - radius / cellSize));

    const endX = Math.min(mapWidth, Math.ceil(centerX + radius / cellSize));

    const startY = Math.max(0, Math.floor(centerY - radius / cellSize));

    const endY = Math.max(0, Math.ceil(centerY - radius / cellSize));

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

  updateCollisionMap({ xPos, yPos, id, radius }) {
    if (!id && id !== 0) {
      throw new Error("Invalid id ${id} for collision map");
    }
    const centerX = Math.floor(xPos / cellSize);
    const centerY = Math.floor(yPos / cellSize);

    if (coordinateMap.has(id)) {
      const oldCenterX = Math.floor(coordinateMap.get(id).xPos / cellSize);
      const oldCenterY = Math.floor(coordinateMap.get(id).yPos / cellSize);

      //Delete old positions for collision map.
      const oldStartX = Math.max(0, Math.floor(oldCenterX - radius / cellSize));

      const oldEndX = Math.min(
        mapWidth,
        Math.ceil(oldCenterX + radius / cellSize),
      );

      const oldStartY = Math.max(0, Math.floor(oldCenterY - radius / cellSize));

      const oldEndY = Math.max(0, Math.ceil(oldCenterY - radius / cellSize));

      for (let x = oldStartX; x < oldEndX; x++) {
        for (let y = oldStartY; y < oldEndY; y++) {
          collisionMap[x][y].delete(id);
        }
      }
    }

    coordinateMap.set(id, { xPos: xPos, yPos: yPos });

    const startX = Math.max(0, Math.floor(centerX - radius / cellSize));

    const endX = Math.min(mapWidth, Math.ceil(centerX + radius / cellSize));

    const startY = Math.max(0, Math.floor(centerY - radius / cellSize));

    const endY = Math.max(0, Math.ceil(centerY - radius / cellSize));

    for (let x = startX; x < endX; x++) {
      for (let y = startY; y < endY; y++) {
        collisionMap[x][y].set(id, {
          radius,
          xPos,
          yPos,
        });
      }
    }
    collisionMapSize();
  }
}

export function createCollisionDetector(config) {
  return new CollisionDetector(config);
}
