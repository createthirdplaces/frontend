import {blockJavaScriptFunctions} from "/js/bots/block.js"

export function runGlobal(){
  if(window.location.href.includes("createthirdplaces.com")){
    window.location.href = "https://createthirdplaces.org/";
  }
  blockJavaScriptFunctions();
}
