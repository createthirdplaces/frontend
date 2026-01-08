import {AttributePassingExample} from "../codeGuides/guidelines/AttributePassingExample.js";
import {VanillaJsClickResizeExample} from "../codeGuides/guidelines/VanillaJsClickResizeExample.js";

customElements.define('attribute-passing-example',AttributePassingExample);
customElements.define('vanilla-js-click-resize-example',VanillaJsClickResizeExample);

export class GuidelinesComponent extends HTMLElement{
  connectedCallback(){
    this.innerHTML = `
        <h3>Before using places.js, think carefully about your use case and how the framework will help</h3>        
          <p>
          Using places.js 
          over vanilla JavaScript will add complexity in instances such as creating a basic show hide component or an 
          image hover component. If you are unsure about using places.js, try experimenting it on a new project or a 
          small part of an existing project.
          </p>
          <p>
          In a website that uses places.js, often it will make sense to create pages using standard web components, only
          use a JavaScript event handler,  or not use any JavaScript. There are many instances where standard web 
          components will be less complex to use,  and standard web components will be significantly faster to render 
          for large numbers of simple components. Places.js is designed to be used on specific parts of a webpage with 
          complex interactivity or backend data fetching.
          </p>
          <p>
          As a general rule, one should make sure to minimize the amount of complexity
          and dependencies. Sometimes, this means using HTML on certain pages or going with a solution that does not 
          involve tech. For example, places.js could theoretically be used for a coin flipping application 
          to randomly pick the start player for a 2 player board game. However, if one of the players has a physical coin, that
          could be used instead.
          </p>
          Web components including places.js components can also have attributes passed to them. 
                    
          <details>
            <summary><b>Example of passing data using attributes</b></summary>
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
         
          <details>
            <summary><b>Example of passing data to web component through DOM</b>
            </summary>
             base-code-display-component is a static places.js
            component used to display code and use the highlight.js library for syntax highlighting.
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
       
          <h3>Create your website a multi page application(MPA) instead of a single page application(SPA)</h3> 
          <p>Places.js is
          designed around support for an MPA. It has not been fully tested with a SPA. 
          Second, it is very important for software projects to limit complexity in order to maximize long term 
          maintainability, speed up development, and minimize the risk of bugs.
          An MPA isolates complexity to a specific part of a website, which makes it easier to test and reason about
          the effects of a change, while helping to reduce the complexity of change.</p>
       
          <h3>Maintain a simple component hierarchy and minimize nested components</h3> 
          <p>As a general guideline, avoid having more
          than 3 layers of nested places.js components. This will make it easier to understand and maintain code while
          making sure the UI isn't complex. A simple UI will help users quickly accomplish a task.</p>
      
          <h3>Consider using standard web component when interactivity needs aren't complex</h3> 

          <p>
          For example, this documentation page is mostly HTML with standard web components. The main use of
          places.js on this documentation page is to create components to show code examples. Places.js
          components are used to make sure the code examples are inside shadow DOM. This ensures a separation
          between syntax highlighting styles and the styles for the rest of the page, and it makes sure that
          CSS inside example code style tags doesn't affect outside styling.Also, standard web
          components can be embedded inside places.js web components.
          </p>
           HTML provides a native show/hide functionality that doesn't require
          JavaScript. Components nested inside can include a native show hide component. To do so, the html should be 
          rendered after connectedCallback is called.
          <details>
            <summary><b>Example of HTML show/hide functionality</b></summary>
            <base-code-display-component>
  <summary>
    BaseDynamicComponent
  </summary>
    &ltbase-dynamic-component-doc></base-dynamic-component-doc>
              </details></base-code-display-component>
            </details>
            <details>
              <summary><b>Standard web component that resizes an image when hovering</b></summary>
              <image-hover-component-guide></image-hover-component-guide>
            </details>
            Image resizing with a hover can also be implemented using the :hover CSS psuedo-class.
                 
            <details>
              <summary><b>Image resizing example with a vanilla JS event handler</b></summary>
              <vanilla-js-click-resize-example></vanilla-js-click-resize-example>
          </details>

          <p><a href="https://gomakethings.com/creating-a-toggle-switch-with-just-css/">Here </a> is an example
          of how a toggle switch can be created using only HTML and CSS. It is also available as a 
          <a href="https://kelpui.com/docs/components/switch/">web component</a> in the Kelp UI library. Kelp
           can be installed without a build step by following 
           <a href="https://kelpui.com/docs/getting-started/installation/">this</a> tutorial.</p> 
          
    On the other hand, a component that is responsible for querying a backend API to update a user's event
            RSVP status, show the status of the RSVP API call, and show an updated RSVP count is a good candidate
            for a places.js component.
          </li>
          <h3>Make sure related HTML elements are contained within the same places.js component</h3>
          
          <p>A large number of places.js components will likely cause unnecessary complexity and could
              cause rendering speed to be noticeable slower. If there is a reason for to related HTML elements to be
              in separate components, they can be in separate standard web components inside a places.js component.
                       Also, separating HTML elements that should be related such as label for an input will cause accessibility 
              challenges. See these links for more information.
          </p>    
   
          <ul>
            <li><a href="https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/">
              Shadow DOM and accessibility, the trouble with ARIA</a></li>
            <li><a href="https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/">
              How Shadow DOM and accessibility are in conflict</a></li>
        </ul>
          
     
        <h3>Don’t use places.js components if search engine optimization(SEO) is important</h3>
          
          <p>Search engine crawlers that look at webpages for search rankings have difficulty processing JavaScript.
           Also, places.js components have been intentionally designed to not be easily understood by automated traffic.
         </p>
         <p>Places.js is also designed for sites that support in person interaction, and this means being designed for
          human user. One part of this is encouraging people to share site information by word of mouth. Having poor SEO
          will incentivize website creators to focus on word of mouth to promote their website.</p>
          
          <p>A site that is easily discovered through an online search will attract more traffic from bots and people 
          who are online. Traffic from bots and people not looking to interact in person will incentivize site owners to 
          prioritize bots and people browsing, and disincentivize features that promote in person interaction.</p>


        </ol>
    `
  }
}