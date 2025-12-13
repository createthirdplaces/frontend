import {HtmlCodeDisplayComponent} from "../../shared/HtmlCodeDisplayComponent.js";

export class AddButtonGuide extends HtmlCodeDisplayComponent {
  getCode(){
    return `
          render(){
        return \`
          <h1>Listing component</h1>
          <button id="add-board-location">Add board location</button>
        \`
      }
    `
  }
}