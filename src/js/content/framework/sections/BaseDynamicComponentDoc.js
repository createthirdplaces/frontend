import {GetTemplateStyleExampleComponent} from "../codeGuides/baseDynamicComponent/GetTemplateStyleExampleComponent.js";
import {RenderFunctionExample} from "../codeGuides/baseDynamicComponent/RenderFunctionExample.js";

customElements.define('get-template-style-example-component',GetTemplateStyleExampleComponent);
customElements.define('render-function-example',RenderFunctionExample);

export class BaseDynamicComponentDoc extends HTMLElement {

  connectedCallback(){
    this.innerHTML = `

      <p>Base class for a state based UI component with support for asynchronous data fetching. It also
      has styles scoped to the ShadowDOM. All state based UI components using places.js should extend this class. A
      component's state data can be accessed in a read only form with the field <b>componentStore.</b></p>
    <!-- Format header -->
      <h4>Constructor parameters </h4>
  
      <ul>
        <li><b>dataStoreSubscriptions</b>: An optional array of data store subscription configurations.
          <h5>Fields</h5>
        </li>
        <ul>
          <li><b>componentReducer: </b>Optional function to define transformations on state data being sent to a 
          component.
    
              <details open="true">
                <summary>Example</summary>
              <base-code-display-component>
export const componentReducer: (groupData) => {
  return {
    ...groupData,
    [SUCCESS_MESSAGE_KEY]: "",
  };
},</base-code-display-component>
             </details>
          </li> 
          <li><b>dataStore</b>: The DataStore object that that will load and store state. </li>
          <li><b>fieldName</b>: The name that the subscribed data should be stored under. This is an optional field unless the component is subscribed to multiple stores.</li>
              
        <li><b>loadingIndicatorConfig</b>: Optional configuration for a loading indicator. When
          defined a loading indicator will be displayed when the component needs to load data from a store.
          <h5>Fields</h5>
          <ul>
            <li><b>generateLoadingIndicatorHtml</b>: A function returning HTML for a loading indicator.</li>
            <li><b>minTimeMs</b>: Optional setting minimum amount of time in miliseconds that the loading indicator will be shown for, regardless of
                how quickly data is loaded for store subscriptions.  If this value is not specified, then the loading indicator
                will be shown until the data is loaded into the store. Use when there is a high amount of variabiliy in how
                fast data will be loaded, and you want to to prevent rapid UI flickering when loading is more quick than usual. It is
                also useful to make UI responsiveness more consistent.</li>
          </ul>
          <details open="true">
            <summary>Basic example</summary>
              <base-code-display-component>
export const LOADING_INDICATOR_CONFIG = {
  generateLoadingIndicatorHtml: () => {
    return \`<p>Loading</p>\`;
  },
  minTimeMs: 500,
};
              </base-code-display-component>
            </details>
            <details open="true">
              <summary>The loading component indicator can also be a web component with a custom image and 
              specific styling. Shadow DOM is used to prevent other styles on the page</summary>
              <loading-indicator-component-guide></loading-indicator-component-guide>
          </li>
        </ul>
  
        <h4>Functions </h4>
        <ul>
          <li>
            <b>attachHandlersToShadowRoot(shadowRoot)</b>: Defines event handlers on a component.
          
            <details open="true">
              <summary>Example</summary>
              <base-code-display-component>
attachHandlersToShadowRoot(shadowRoot) {
  shadowRoot.addEventListener("click", (event) => {
    if (event.target.id === SIGN_OUT_LINK_ID) {
      LOGOUT_STORE.fetchData({}, LOGIN_STORE);
    }
  });
}
                </base-code-display-component>
              </details>
            </li>
            
            <li>
              <b>connectedCallback</b>: Standard web component lifecycle method. Use for initializing component state if it
              does not rely on an external store. A component must be state before it is rendered.
              <details open="true">
                <summary>Example</summary>
                  <base-code-display-component>
connectedCallback() {
  document.title = \`Add event for group \$\{new URLSearchParams(document.location.search).get("name") ?? ""}\`;
  this.updateData({
    name: "",
    groupName: new URLSearchParams(document.location.search).get("name") ?? ""
  });
}
                  </base-code-display-component>
              </details>
            </li>
            
            <li>
              <b>getTemplateStyle</b>: Required function for defining a component's style. It can also load external
              stylesheets.

              <details open="true">
                <summary>Example</summary>
                  <get-template-style-example-component>
                  </get-template-style-example-component>
              </details>

            </li>
            
            <li><b>render(data)</b>: Required function used to render HTML for the component. The data parameter
              is a read-only representation of the component's store data.
            <details open="true">
              <summary>Example</summary>
                <render-function-example>
                </render-function-example>
               </details>
            </li>
            
            <li><b>updateData(data)</b>Use this function to update the state of a component inside an event handler or
              connectedCallback. <b>Calling this method from another location can lead to infinite rendering loops
              or unpredictable rendering.</b>
              <details open>
                <summary>Example from event handler</summary>
                <base-code-display-component>
const attachHandlersToShadowRoot = function (shadowRoot) {
  const self = this;

  queryForServerStatus();
  shadowRoot.addEventListener("click", (event) => {
  const targetId = event.target.id;
    if (targetId === RECURRING_EVENT_INPUT) {
      self.updateData({
        isRecurring: shadowRoot.getElementById(RECURRING_EVENT_INPUT)?.checked,
      });
  }
}</base-code-display-component>
              </details>

            </li>
          </ul>

          <h4>Other notes</h4>
          <ul>
            <li>The BaseDynamicComponent object uses the disconnectedCallback function to make sure store 
            subscriptions are up to date when a component is disconnected. Overriding this method could lead to 
            unpredicatable rendering behavior.</li>
            <li>Multiple components can subscribe to the same data store. </li>
            <li> Read only state for the component can be accessed inside the component from the componentStore 
            field.</li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements">
              More information</a> about web component lifecycle methods.</li>
          </ul>
    
    `
  }
}