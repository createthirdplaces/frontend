import hljs from 'https://unpkg.com/@highlightjs/cdn-assets@11.11.1/es/highlight.min.js';
import {BaseTemplateComponent} from "../../../../shared/lib/places-js-latest.js";

export class HtmlCodeDisplayComponent extends BaseTemplateComponent {
  getTemplateStyle(){
    return `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/default.min.css">

      <style>
        pre {
          background-color:#f6f8fa;
        }
      </style>
    `
  }

  render(){
    let code = this.getCode().replaceAll("&gt;",">")
      .replaceAll("&lt;","<");
    
    let indent = 0;
    let i =0; 
    while(true){
      const charCode = code.charCodeAt(i);
      if(charCode !== 10 && charCode !== 32){
        break;
      }
      i++;
      if(charCode === 32){
        indent++; 
      }
    }
    indent--;
    const lines = code.split("\n");
    for(let i=0; i<lines.length; i++){
      lines[i] = lines[i].substring(indent); 
    }
    
    code = lines.join("\n");
    
    return `
    <code>
      <pre>${hljs.highlightAuto(code).value}</pre>
    </code>
    `
  }

}
