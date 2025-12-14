import {AddItemsGuide} from "./codeComponents/AddItemsGuide.js";

customElements.define('add-items-guide',AddItemsGuide);

export class CreateListGuideComponent extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `

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

    <p>Add ability to enter location names and have them displayed as a list.</p>
    <add-items-guide></add-items-guide>
`

    ;
  }
}