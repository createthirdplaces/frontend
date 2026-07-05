import {BaseDynamicComponent} from "../shared/lib/places-js-latest.js";
import {SIMULATION_STORE} from "./Simulation.js";

export default class MainComponent extends BaseDynamicComponent {
   
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
      
      SIMULATION_STORE.fetchData({
        simulationRuns:10000,
      });

      if(!self.componentStore.isLoading){
        console.log("Updating");
        self.updateData({isLoading:true}); 
      }
    });
  }
   
  render(data) {  
    console.log("Rendering main component");
    return `
      <button id="start-button">Start simulation</button>
      ${data.isLoading ? `<simulation-component>` : ``}
    `;
  }
}
