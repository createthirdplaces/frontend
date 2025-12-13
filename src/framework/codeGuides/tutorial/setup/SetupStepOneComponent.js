import {HtmlCodeDisplayComponent} from "../../shared/HtmlCodeDisplayComponent.js";

export class SetupStepOneComponent extends HtmlCodeDisplayComponent {
  getCode() {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Public community board listing </title>
  </head>
  <script type="module">
    //Add minified places.js code here.
    class ListingComponent extends BaseDynamicComponent{
      getTemplateStyle() {
        return \`<style></style>\`
      }
      connectedCallback(){
        this.updateData({});
      }
      render(){
        return \`<h1>Listing component</h1>\`
      }
    }
    customElements.define('listing-component',ListingComponent);
  </script>
  <body>
    <listing-component></listing-component>
  </body>
</html>`
  }
}