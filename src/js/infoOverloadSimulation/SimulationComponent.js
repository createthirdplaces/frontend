import {BaseDynamicComponent} from "../shared/lib/places-js-latest.js";

import {SIMULATION_STORE} from "./Simulation.js";

const LOADING_INDICATOR_CONFIG = {
  generateLoadingIndicatorHtml: () => {
    return `<p>Loading</p>`;
  },
  minTimeMs: 500,
};

export default class SimulationComponent extends BaseDynamicComponent {

  constructor() {
    super([
      {
        componentReducer: (data)=>{
          console.log("Simulation data:"+data);
          return data;
        },
        dataStore: SIMULATION_STORE,
        fieldName: "simulationData",
        loadingIndicatorConfig:LOADING_INDICATOR_CONFIG
      } 
    ])
  }
  
  getTemplateStyle(){
    return `
      <style>
      </style>
    `
  }

  attachHandlersToShadowRoot(shadowRoot){
    const self = this;
    shadowRoot.addEventListener("click", (event)=> {
      event.preventDefault(); 
      if (event.target.id === "start-button") {
        SIMULATION_STORE.fetchData({});
      }
    });
  }
   
  render(data) {  
    console.log("Simulation data:"+data);
    return `
      <p>Successful: ${data.simulationData.finished}</p> 
      <p>Unfinished: ${data.simulationData.unfinished}</p>
    `;
  }
}
