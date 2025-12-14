import {HtmlCodeDisplayComponent} from "../../shared/HtmlCodeDisplayComponent.js";

export class MapUpdateGuidePartOne extends HtmlCodeDisplayComponent {
  getCode(){
    return `<\!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Location map listing </title>
  </head>
  <script type="module">
    //Places.js source code goes here.
    class ListingComponent extends BaseDynamicComponent{
      getTemplateStyle() {
        return \`
          <style>
            #dc-street-map {
              display: block;
              height: 50%;
              margin-top: 2rem;
              width: 50%;
              z-index: -10;
            }
            #success-message {
              color: #00bb51;
              font-weight: 600;
            }
            #status-section {
              height: 1rem;
            }
            .location-point {
              position: absolute;
              z-index:10;
              width: 30px;
              aspect-ratio: 1;
              background: #423600;
              clip-path: polygon(50% 0,
                calc(50%*(1 + sin(.4turn))) calc(50%*(1 - cos(.4turn))),
                calc(50%*(1 - sin(.2turn))) calc(50%*(1 - cos(.2turn))),
                calc(50%*(1 + sin(.2turn))) calc(50%*(1 - cos(.2turn))),
                calc(50%*(1 - sin(.4turn))) calc(50%*(1 - cos(.4turn)))
              );
            }
          </style>\`
      }

      connectedCallback(){
        this.updateData({
          showInput: false
        });
      }

      attachHandlersToShadowRoot(shadowRoot){
        const self = this;
        shadowRoot.addEventListener("click",(event)=>{

          if(event.target.id === 'export-data-button') {
            const dataStr = JSON.stringify({...self.componentStore,statusMessage:""});

            const blob = new Blob([dataStr], {type: "application/json"});
            const url = URL.createObjectURL(blob);

            const fileName = "locationsExport.json"
            const anchorEl = document.createElement("a");
            anchorEl.href = url;
            anchorEl.download = fileName;

            anchorEl.click();

            URL.revokeObjectURL(url);
          }

          if(event.target.id === 'import-data-button') {
            let files = self.shadowRoot.getElementById('select-import-file').files;
            if(files.length <=0){
              return;
            }

            let reader = new FileReader();

            reader.readAsText(files[0]);
            reader.onload = function () {
              if (reader.result !== null) {
                self.updateData(JSON.parse(reader.result))
              }
            };

          }

          if(event.target.id === 'delete-board-location'){

            const editingLocation = self.componentStore.editingLocation;
            let updatedLocations = [];

            for(let i=0;i<self.componentStore.locations.length;i++) {
              const item = self.componentStore.locations[i];
              if (item.displayX !== editingLocation.displayX || item.displayY !== editingLocation.displayY) {
                updatedLocations.push(item);
              }
            }

            self.updateData({
              editingLocation: null,
              locations: updatedLocations
            })
          }

          if(event.target.id === 'update-board-location'){

            let updatedLocations = self.componentStore.locations.slice();

            for(let i=0;i<updatedLocations.length;i++){
              const item = updatedLocations[i];
              if(item.displayX === editingLocation.displayX && item.displayY === editingLocation.displayY){
                updatedLocations[i] = {...item,locationName: shadowRoot.getElementById('location-name-input').value};;
              }
            }
            self.updateData({
              editingLocation: null,
              locations: updatedLocations,
            })
          }

          if(event.target.id === 'add-board-location'){
            let locationData = [];
            if(self.componentStore.locations){
              locationData = self.componentStore.locations.slice();
            }
            locationData.push({
              displayX: self.componentStore.mapClickX-15,
              displayY: self.componentStore.mapClickY-15,
              locationName: shadowRoot.getElementById('location-name-input').value,
            })
            self.updateData(
              {
                "locations":locationData,
                "statusMessage":"Added location",
              }
            )
          }

          if(event.target.className === 'location-point'){

            const x = parseInt(event.target.style.left.split("px")[0]);
            const y = parseInt(event.target.style.top.split("px")[0]);

            let editingLocation = null;
            for(let i = 0; i<self.componentStore.locations.length; i++){
              const item = self.componentStore.locations[i];
              if(item.displayX === x && item.displayY === y){
                editingLocation = item;
              }
            }

            self.updateData({
              editingLocation: editingLocation
            })

            event.preventDefault();
          }

          if(event.target.id === 'dc-street-map'){
            const clickX = event.clientX;
            const clickY = event.clientY;

            let offsetY = self.componentStore.offsetY;
            if(!self.componentStore.showInput){
              offsetY = event.target.getBoundingClientRect().y;
            }

            self.updateData({
              "mapClickX":clickX,
              "mapClickY":clickY,
              "offsetY":offsetY,
              "showInput":true
            })
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

      getLocationInputHtml(data){

        console.log("Updating with data:"+JSON.stringify(data));
        if(!data.showInput){
          return \`\`
        }

        if(data.editingLocation) {
          return \`
          <label>Name of location</label>
          <input
            id="location-name-input"
            value="\${data.editingLocation.locationName ?? ''}"
          >
          <button id="update-board-location">Update board location</button>
          <button id="delete-board-location">Delete board location</button>
        \`
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

      showLocationsOnMap(data){

        if(data.locations){

          let html = \`<div id="location-overlay" style="z-index: 10; top:\${data.offsetY}px">\`
          for(let i =0; i<data.locations.length; i++){
            const location = data.locations[i]
            html+= \`<div class=location-point style="position: absolute;top:\${location.displayY}px;left:\${location.displayX}px">
            </div>\`
          }

          html+= \`<div>\`;
          return html;
        }
        return \`\`
      }

      showStatusMessage(data){
        return \`
          <div id="status-section">
            <p id="success-message">\${data.statusMessage ?? ''}</p>
          </div>
        \`
      }

      showImportAndExportData(data){
        let html = \`<div id="import-and-export">
          <input type="file" id="select-import-file"/>
          <button id ="import-data-button">Import data</button>
        \`
        if(data.locations && data.locations.length > 0){
          html+=  \`<button id="export-data-button">Export data</button>\`
        }
        return html + \`</div>\`
      }

      render(data){
        return \`
          <h1>A listing of community boards</h1>
          <p>Click on map to add or edit a location.</p>

          \${this.getLocationInputHtml(data)}
          \${this.showStatusMessage(data)}
          \${this.showImportAndExportData(data)}
          <div id = "map-container" >
            \${this.showLocationsOnMap(data)}
            <img id="dc-street-map" src="/images/dc/dc-street-map.jpg"></img>
          </div>
          Image from Ontheworldmap.com at 
          <a href="https://ontheworldmap.com/usa/city/washington-dc/detailed-street-map-of-washington-dc.html">link</a>
          \${this.getLocationDisplayHtml(data)}
        \`
      }
    }
    customElements.define('listing-component',ListingComponent);
  </script>
<body>
  <listing-component></listing-component>
</body>
</html> 
    `
  }
}