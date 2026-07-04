import {CustomLoadAction, DataStore} from "../shared/lib/places-js-latest.js";

/**
 * TOOD for first iteration
 *
 * Use 1 hour as default parameter for time, and assume you
 * can fully proccess 60 units of information.
 * :
 **/
async function retrieveData(params) {
 
  const maxTime = 3600;
  const infoConsumeTime = 60;
  const switchTime = 1;
 
  const infoUnits = 60;

  const infoTimes = [];
  for(let i = 0; i < infoUnits; i++){
    infoTimes.push(Math.floor((Math.random())*3600));
  }

  infoTimes.sort(function(a,b){return b-a})

  let finished = 0;
  let unfinished = 0;
  let time = 0;

  let isThinking = false;
  while (time < maxTime) {
  
    let remainingItemTime = 0;
    
    //Is there information that is waiting to be proccessed?
    if (isThinking === false){
      if (unfinished === 0){
        time = infoTimes.pop();
        isThinking = true;
      }
      else {
        unfinished --;
        isThinking = true;
      } 
    } else {
      
      let nextTime = infoTimes.pop();

      //Information has been fully processed. 
      if (nextTime - time > infoConsumeTime) {
        time = nextTime;
        finished ++;
        isThinking = false;
      } else {
        unfinished ++;

        //Add time for context switching.
        time = time + switchTime * 2;

        while(infoTimes.length > 0 && infoTimes[infoTimes.length - 1] < time){
          infoTimes.pop();
          unfinished ++;
          time = time + switchTime*2;
        }
      }
    }
  }

  return {
    finished: finished,
    unfinished: unfinished
  }
} 

export const SIMULATION_STORE = new DataStore(new CustomLoadAction(retrieveData));
