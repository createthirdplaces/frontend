import {HtmlCodeDisplayComponent} from "../../shared/HtmlCodeDisplayComponent.js";

export class AddItemsGuide extends HtmlCodeDisplayComponent{
  getCode(){
    return ` attachHandlersToShadowRoot(shadowRoot){
  const self = this;
  shadowRoot.addEventListener("click",(event)=>{
    if(event.target.id === 'add-board-location'){
      let locationData = [];
      if(self.componentStore.locations){
        locationData = self.componentStore.locations.slice();
      }
      locationData.push({
        locationName: shadowRoot.getElementById('location-name-input').value
      })
      self.updateData({"locations":locationData})
    }
  })
}

getLocationDisplayHtml(data) {
  if(!data.locations){
    return \`\`;
  }

  let html = \`<h2>Location list</h2><ul>\`;
  for(let i=0; i<data.locations.length;i++){
    html+= \`<li>\${data.locations[i].locationName}</li>\`;
  }
  html+= \`</ul>\`
  return html;
}

render(data){
  return \`
    <h1>Listing component</h1>

    <label>Name of location</label>
    <input
      id="location-name-input"
      value="\${data.name ?? ''}"
    >
    <button id="add-board-location">Add board location</button>
    \${this.getLocationDisplayHtml(data)}
  \`
}`
  }
}