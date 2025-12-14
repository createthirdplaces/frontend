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
      
      <p>After verifying that the map shows up, here is an example of locations can be shown on the map. The following 
      features are supported.</p>
      
      <ul>
        <li>Location names can be created, edited, or deleted.</li>
        <li>When a location is saved on the map, it will be displayed as a star at the location that the user clicked
        on.</li>
        <li>Location data can be exported as JSON. The locations on the map are stored in pixel coordinates.</li>
        <li>Location data can be imported as JSON.</li>
</ul>

      <p>This code represents a proof of concept with basic features and styling. The latest version can be
      viewed <a href="/static/locationMapListing.html">here</a>. Also, it is recommended that the JavaScript for the component
      is in a separate file if it will be updated. The combined HTML and Javascript is for ease of use when getting 
      started.</p>

      <map-update-guide-part-one></map-update-guide-part-one>
    `
  }
}