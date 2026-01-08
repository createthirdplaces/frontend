import {HtmlCodeDisplayComponent} from "../shared/HtmlCodeDisplayComponent.js";

export class AttributePassingExample extends HtmlCodeDisplayComponent {
  getCode(){
    return `
<image-upload-component
  id="image-upload-ui"
  image-path="\${data.imagePath}"
></image-upload-component>`
  }
}