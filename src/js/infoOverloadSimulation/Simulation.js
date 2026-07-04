import {CustomLoadAction, DataStore} from "../shared/lib/places-js-latest.js";

async function retrieveData(params) {
 
  const maxTime = params.maxTime || 3600;
  const infoConsumeTime = params.infoConsumeTime || 60;
  const infoUnits = params.totalItems || 120;
  const simulationRuns =  params.simulationRuns || 1;
  const switchTime = params.switchTime || 30; 
  
  let totalFinished = 0;
  let totalUnfinished = 0;

  for(let j = 0; j < simulationRuns; j++){
    const infoTimes = [];
    for(let i = 0; i < infoUnits; i++){
      infoTimes.push(Math.floor((Math.random())*maxTime));
    }

    infoTimes.sort(function(a,b){return b-a})

    let finished = 0;
    let unfinished = 0;
    let time = 0;

    let currentItem = null;
   
    let prevFinish = 0;
    while (time < maxTime && infoTimes.length > 0 ) {
  
      let remainingItemTime = 0;
      
      //Is there information that is waiting to be proccessed?
      if (currentItem === null){j
        if (unfinished === 0){ 
          time = infoTimes.pop();
          currentItem = {
            startTime: time
          }
        }
        else {
          unfinished --;
          currentItem = {
            startTime: time
          }
        } 
      } else {
       
        let nextTime = infoTimes[infoTimes.length - 1];

        //Information has been fully processed.   
        if (nextTime - currentItem.startTime > infoConsumeTime) {
          finished ++;
          currentItem = null;
          time += infoConsumeTime;
          prevFinish = time;
        } else {

          //Add time for context switching.
          time = time + switchTime * 2;
          unfinished ++;
          infoTimes.pop();

          while(infoTimes.length > 0 && infoTimes[infoTimes.length - 1] < time){
            time  = time + switchTime*2;
            unfinished ++;
            infoTimes.pop();
          }
        }
      }
    }

    totalFinished += finished;
    totalUnfinished += unfinished;
  }
  
  return {
    finished: totalFinished / simulationRuns,
    unfinished: totalUnfinished / simulationRuns
  }
} 

export const SIMULATION_STORE = new DataStore(new CustomLoadAction(retrieveData));
