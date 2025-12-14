import {HtmlCodeDisplayComponent} from "../shared/HtmlCodeDisplayComponent.js";

export class GetTemplateStyleExampleComponent extends HtmlCodeDisplayComponent {
  getCode(){
    return `
getTemplateStyle() {
  return \`
    <link as="style" href="/styles/sharedHtmlAndComponentStyles.css" onload="this.rel='stylesheet'"/>
    "&gtstyle>
      a {
        color: white;
        text-decoration: none;
      }
    </style>
  \`;
}`
  }
}