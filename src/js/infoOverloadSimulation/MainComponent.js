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
      self.updateData({isLoading:true}); 
      if (event.target.id === "start-button") {
        SIMULATION_STORE.fetchData({});
      }
    });
  }
   
  render(data) {  
    return `
      <button id="start-button">Start simulation</button>
      ${data.isLoading ? `<simulation-component>` : ``}
    `;
  }
}
