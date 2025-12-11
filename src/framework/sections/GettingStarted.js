import {SetupComponentExample} from "../codeGuides/setup/SetupComponentExample.js";
import {SetupHtmlExample} from "../codeGuides/setup/SetupHtmlExample.js";
import {BaseDynamicComponent} from "../../shared/places-js-latest.js";

customElements.define('setup-component-example',SetupComponentExample);
customElements.define('setup-html-example',SetupHtmlExample);

export class GettingStarted extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <details open>
        <summary>Installing framework</summary>
        
          <ul>
            <li>Download the latest build <a href="https://github.com/gatherspiel/places-js/blob/main/places-js-latest-min.js">here.</a></li>
            <li>Create a module type script in your page HTML.
              <details open>
                <summary>Example</summary>
              <base-code-display-component><script type="module">
  import {BaseDynamicComponent} from "./places-js-latest.js";
                         
  class MainComponent extends BaseDynamicComponent {
  
    constructor(){
      super();
    }
  
  
    getTemplateStyle() {
      //Template style goes here.
    }
  
    render(componentState) {
      //HTML for the component goes here.
    }
  }
  </script> </base-code-display-component> 
            </li>
          </ul>
          <ul>
            <li>
              places-js can also be installed using npm with: <pre>npm install @bponnaluri/places-js</pre>
            </li>
          </ul>
      </details>
      
      Example of how to create a user feedback component

      <details open>
        <summary>HTML</summary>
        <setup-html-example></setup-html-example>
      </details>
      
      <details open>
        <summary>Places.js component</summary>
        <setup-component-example></setup-component-example>
      </details>

    </details>
      
    `
  }
}