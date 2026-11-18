import {CITY_SIZE_X,CITY_SIZE_Y} from 'Config.js';

class RandomUpdater {

		update(xPos, yPos){
			
			const newX = xPos + Math.floor(Math.random()* 5) -2;
			const newY = yPos + Math.floor(Math.random()*5)-2;
			if(newX >= CITY_SIZE_X){
				newX = CITY_SIZE_X -1;
			}
			if(newX <= 0){
				newX = 1;
			}
			if(newY <=0){
				newY=1;
			}
			if(newY >= CITY_SIZE_Y){
				newY = CITY_SIZE_Y -1;
			}
			return {newX,newY};	
	}
}

export const RANDOM_UPDATER = new RandomUpdater();
