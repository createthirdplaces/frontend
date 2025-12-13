export class AddMapGuideComponent extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <p>Make sure input only shows up when clicking on map</p>
      <p>Display a location marker on map</p>
      
      <p>Add ability to edit location</p>
      <p>Add ability to delete location</p>
      
      <p>Export as JSON</p>
      <p>Importing existing data using connectedCallback.</p>
      <p>Map guide </p>
    `
  }
}