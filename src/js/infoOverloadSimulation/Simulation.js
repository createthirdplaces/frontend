import {CustomLoadAction, DataStore} from "../shared/lib/places-js-latest.js";

async function retrieveData(params) {
  
  const data = await fetch(
    `dmvboardgames.com/auth/v1/logout?scope=global`
    );
 
  console.log("Hi");
  return "22";
  
} 

export const SIMULATION_STORE = new DataStore(new CustomLoadAction(retrieveData));
