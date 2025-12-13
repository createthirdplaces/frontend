export class AddMapGuideComponent extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <p>Make sure input only shows up when clicking on map</p>
      
      <details open>
        <summary>Event handler updates</summary>
        <base-code-display-component>
if(event.target.id === 'dc-street-map'){
  self.updateData({"showInput":true})
}</base-code-display-component>
      </details>

      <details open>
        <summary>Rendering updates</summary>
        <base-code-display-component>
getLocationInputHtml(data){
  console.log(data.showInput)
  if(!data.showInput){
    return \`\`
  }
  return \`
     <label>Name of location</label>
    <input
      id="location-name-input"
      value="\${data.name ?? ''}"
    >
    <button id="add-board-location">Add board location</button>
  \`
}

render(data){
  return \`
    <h1>Listing component</h1>

    \${this.getLocationInputHtml(data)}
    \${this.getLocationDisplayHtml(data)}

    <img id="dc-street-map" src="/images/dc/dc-street-map.jpg"></img>
    Image from Ontheworldmap.com at 
    <a href="https://ontheworldmap.com/usa/city/washington-dc/detailed-street-map-of-washington-dc.html">link</a>
  \`
}</base-code-display-component>
    </details>

<details open>
  <summary>Style updates</summary>
  <base-code-display-component>getTemplateStyle() {
  return \`
    <style>
      #dc-street-map {
        display: block;
        height: 50%;
        margin-top: 1rem;
        width: 50%;

      }

    </style>\`
}
</base-code-display-component>
</details>
      <p>Display a location marker on map</p>
      <p>Separate code display blocks for styles and map code</p>
      <p>Add ability to edit location</p>
      <p>Add ability to delete location</p>
      
      <p>Export as JSON</p>
      <p>Importing existing data using connectedCallback.</p>
      <p>Map guide </p>
    `
  }
}