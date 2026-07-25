export class SetupGuideComponent extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <ul>
        <p>Note: This tutorial assumes you are not using a build step. In production, it is recommended that you split
              up components in a manner similar to the example
              <a href="https://codeberg.org/createthirdplaces/DMVBoardGames/src/branch/main/src/index.html">here</a></p>
        <li>Download Places.js from 
          <a href="https://codeberg.org/createthirdplaces/places-js/src/branch/main/places-js-min.js">here</a>
        </li>
        <li>
          <details open>
            <summary>Create a basic HTML page with places.js. Paste the minified places.js code at the top of the script 
             section.</summary>
            <setup-step-one-component></setup-step-one-component>
          </details>
          <p>Afterwards, you should see a page that looks like the following example.</p>
          <img src="/images/tutorial/setup_screenshot_one.png"></img>
        </li>
      </ul>
  `
  }
}
