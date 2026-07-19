import {HtmlCodeDisplayComponent} from "/js/content/framework/codeGuides/shared/HtmlCodeDisplayComponent";

export class AttributePassingExample extends HtmlCodeDisplayComponent {
  getCode(){
    return `
<image-upload-component
  id="image-upload-ui"
  image-path="\${data.imagePath}"
></image-upload-component>`
  }
}
