import {AddButtonGuide} from "./locationListing/addButtonGuide.js";
customElements.define('add-button-guide',AddButtonGuide);

export class CreateListGuideComponent extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `<p>Test</p>

      <details open>
        <summary>Add button with event handler</summary>
          <base-code-display-component>
          
attachHandlersToShadowRoot(shadowRoot){
  shadowRoot.addEventListener("click",(event)=>{
    if(event.target.id === 'add-board-location'){
      console.log("A board location should be added");
    }
  })
}          

render(){
  return \`
    <h1>Listing component</h1>
    <button id="add-board-location">Add board location</button>
  \`
}</base-code-display-component>
    </details>

    <p>Create input fields and display them</p>
  
`




    ;
  }
}