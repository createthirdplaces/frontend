export class BaseTemplateComponentDoc extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <p>Base class for rendering a component using the shadow DOM without using places.js state management. It
      extends the HTMLElement class used by 
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_components">web components.</a>
       </p>
      <h4>Functions </h4>
      <ul>
        <li>
          <b>connectedCallback():</b> Used by the BaseTemplateComponent class to setup and render the component
          with shadow DOM. <b>Do not override this method. </b>
        </li>
        <li>
          <b>getTemplateStyle</b>: Required function for defining a component's style. It can also load external
          stylesheets.
          <details open="true">
            <summary>Example:</summary>
            <base-code-display-component>
getTemplateStyle() {
  return \`
    &ltlink 
      href="/styles/sharedStyles.css"
      rel="stylesheet" 
      type="text/css" />

    <style>
      a {
        color: white;
        text-decoration: none;;
      }
    </style>
  \`;
}
            </base-code-display-component>
          </details>
        </li>
        <li>
          <b>render(data)</b>: Required function used to render HTML for the component.
      
          <details open="true">
            <summary>Example:</summary>
            <base-code-display-component>
    render(userData) {
    return \`
      <h2>A component</h2>
    \`;
    }
           </base-code-display-component>
    
          </details>
        </li>
          
  
        </ul>
    `
  }
}