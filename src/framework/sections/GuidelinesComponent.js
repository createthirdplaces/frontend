import {AttributePassingExample} from "../codeGuides/guidelines/AttributePassingExample.js";

customElements.define('attribute-passing-example',AttributePassingExample)
export class GuidelinesComponent extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
      <ul id="guidelines-list">
        <li>Before using places.js, think carefully about your use case and how the framework will help. Using places.js 
          over vanilla JavaScript will add complexity in instances such as creating a basic show hide component or an 
          image hover component. If you are unsure about using places.js, try experimenting it on a new project or a 
          small part of an existing project.
          <br>
          <br>
          In a website that uses places.js, often it will make sense to create pages using standard web components
          or not use any JavaScript. There are many instances where standard web components will be less complex to use, 
          and standard web components will be significantly faster to render for large numbers of simple components. 
          Places.js is designed to be used on specific parts of a webpage with complex interactivity or backend data
           fetching.
          <br>
          <br>
          As a general rule, one should make sure to minimize the amount of complexity
          and dependencies. Sometimes, this means using HTML on certain pages or going with a solution that does not 
          involve tech. For example, places.js could theoretically be used for a coin flipping application 
          to randomly pick the start player for a 2 player board game. However, if one of the players has a physical coin, that
          could be used instead.
          <br>
          <br>
          Web components can also have attributes passed to them, and this includes places.js web components. Here
          is an example of passing data to a web component.
                    
          <details open>
            <summary>Passing data using attributes</summary>
             <attribute-passing-example></attribute-passing-example>
             
             An attribute can then be retrieved by calling the getAttribute method.
             <base-code-display-component>export class ImageUploadComponent extends HTMLElement {

  constructor() {
    super();
  
    const filePath = this.getAttribute("image-path");
    if (
      filePath === null ||
      filePath === undefined ||
      filePath === "null" ||
      filePath === "undefined" ||
      filePath.length === 0
    ) {
      this.setAttribute("image-path", "");
    }
    this.addEventListener("change", this.uploadImage);
    this.addEventListener("click", this.deleteImage);
  }      

  deleteImage(event) {
    const self = this;

    if (event.target.id === "remove-uploaded-image") {
      self.setAttribute("image-path", "");
      self.innerHTML = self.#getHtml();
      event.preventDefault();
    }
  }
  
  uploadImage(event) {
    const self = this;
    if (event.target.id === "upload-image-input") {
      let file = event.target.files[0];
      let reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = function () {
        if (reader.result !== null) {
          self.setAttribute("image-path", reader.result.toString());
          self.innerHTML = self.#getHtml();
        }
      };
    }
  }
}</base-code-display-component>
          </details>
         
          <details open>
            <summary>Passing data to web component through DOM. base-code-display-component is a static places.js
            component used to display code and use the highlight.js library for syntax highlighting.
            </summary>
<base-code-display-component>
<base-code-display-component>
  function getCitiesQueryConfig() {
    return {
      url: API_ROOT + "/listCities?area=dmv",
    };
  }
  
  export const CITY_LIST_STORE = new DataStore(
   new ApiLoadAction(getCitiesQueryConfig),
  );
</base-code-display-component>
</base-code-display-component>
          </details>
          <p>The code display component is a places.js component to make sure styling is done in shadow DOM. This
          ensures that outside styles and the code syntax highlighting styles are applied to the correct areas.</p>
       </li>
        <li>Create your website a multi page application(MPA) instead of a single page application(SPA): Places.js is
          designed around support for an MPA. The framework has not been fully tested with a SPA. 
          Second, it is very important for software projects to limit complexity in order to maximize long term 
          maintainability, speed up development, and minimize the risk of bugs.
          An MPA isolates complexity to a specific part of a website, which makes it easier to test and reason about
          the effects of a change, while helping to reduce the complexity of change.
        </li>
        <li>
          Maintain a simple component hierarchy and minimize nested components: As a general guideline, avoid having more
          than 3 layers of nested places.js components. This will make it easier to understand and maintain code while
          making sure the UI isn't complex. A simple UI will help users quickly accomplish a task.
        </li>
        <li>
          When interactivity needs aren't complex, consider using a standard web component. Also, standard web
          components can be embedded inside places.js web components.

          For example, this documentation page is mostly HTML with standard web components. The main use of
          places.js on this documentation page is to create components to show code examples. Places.js
          components are used to make sure the code examples are inside shadow DOM. This ensures a separation
          between syntax highlighting styles and the styles for the rest of the page, and it makes sure that
          CSS inside example code style tags doesn't affect outside styling.
          <br/>
          <br/>
          One example is show/hide components. HTML provides a native show/hide component that doesn't require
          JavaScript. Components nested inside can include a native show hide component. To do so, the html should be 
          rendered after connectedCallback is called.
          <details open>
            <summary></summary>
            <base-code-display-component><details>
  <summary>
    BaseDynamicComponent
  </summary>
    &ltbase-dynamic-component-doc></base-dynamic-component-doc>
</details></base-code-display-component>
            </details>
                       Another example is a component that resizes an image when a mouse pointer is hovering over an image. Adding
            a hover style using CSS is sufficient to provide interactivity.
            <details open>
            <summary></summary>
            <image-hover-component-guide></image-hover-component-guide>
</details>
            On the other hand, a component that is responsible for querying a backend API to update a user's event
            RSVP status, show the status of the RSVP API call, and show an updated RSVP count is a good candidate
            for a places.js component.
          </li>
          Abstractions and custom components
        </ul>
    `
  }
}