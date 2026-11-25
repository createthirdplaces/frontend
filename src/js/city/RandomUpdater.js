import {DISPLAY_HEIGHT,DISPLAY_WIDTH} from './Config.js';

const MAX_VELOCITY = 2;

class RandomUpdater {

  static velocityX = new Map();
  static velocityY = new Map();
  
	update({xPos, yPos, id, collisionDetector,radius}){
	
		if(!RandomUpdater.velocityX.has(id)){
      RandomUpdater.velocityX.set(id,Math.random()*20-10);
      RandomUpdater.velocityY.set(id,Math.random()*20-10);
    } else {
   
      let accX = (Math.random()/2) - 0.25;
		  let accY = (Math.random()/2) - 0.25;

      let updatedVelocityX = RandomUpdater.velocityX.get(id) + accX;
      let updatedVelocityY = RandomUpdater.velocityY.get(id) + accY;
      
      if(updatedVelocityX > MAX_VELOCITY){
        updatedVelocityX = MAX_VELOCITY;
      }

      if(updatedVelocityY > MAX_VELOCITY){
        updatedVelocityY = MAX_VELOCITY;
      }
      
      if(updatedVelocityX < -1*MAX_VELOCITY){
        updatedVelocityX = -1*MAX_VELOCITY;
      }

      if(updatedVelocityY < -1*MAX_VELOCITY){
        updatedVelocityY = -1*MAX_VELOCITY;
      }

      RandomUpdater.velocityX.set(id,updatedVelocityX);
      RandomUpdater.velocityY.set(id,updatedVelocityY);
    }
   
		let velocityX = RandomUpdater.velocityX.get(id);
		let velocityY = RandomUpdater.velocityY.get(id); 
    let newX = xPos + velocityX;
    let newY = yPos + velocityY;

		if(newX >= DISPLAY_WIDTH){
			newX = DISPLAY_WIDTH -1;	
      RandomUpdater.velocityX.set(
        id,
        RandomUpdater.velocityX.get(id)*-1);
    }
		if(newX <= 0){
			newX = 1;
      RandomUpdater.velocityX.set(
        id,
        RandomUpdater.velocityX.get(id)*-1
      );
		}
    if(newY >= DISPLAY_HEIGHT){
			newY = DISPLAY_HEIGHT -1;
      RandomUpdater.velocityY.set(
        id,
        RandomUpdater.velocityY.get(id)*-1
      );
		}
		if(newY <=0){
			newY=1;
      RandomUpdater.velocityY.set(
        id,
        RandomUpdater.velocityY.get(id)*-1
      );
		}

		const collisionConfig = {
			id:id,
			radius:radius,
			xPos:newX,
			yPos:newY,	
		}
		if(collisionDetector.hasCollision(collisionConfig) === false){

			collisionDetector.updateCollisionMap(collisionConfig);

			return {
				xPos:newX,
				yPos:newY
			}		
		}

		velocityX = velocityX*-1;
		velocityY = velocityY*-1;
	
		collisionConfig.xPos=newX+velocityX;
		collisionConfig.yPos=newY+velocityY;	
		
		collisionDetector.updateCollisionMap(collisionConfig);

		return {
			xPos:collisionConfig.xPos,
			yPos:collisionConfig.yPos
		};
	}

	getUpdatesPerSecond() {
		return 20;
	}
}

export const RANDOM_UPDATER = new RandomUpdater();
