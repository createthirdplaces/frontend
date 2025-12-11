
import {BaseDynamicComponent} from "../../../shared/places-js-latest.js";

export class LocationListingTutorialComponent extends BaseDynamicComponent {

  constructor(){
    super();
  }

  attachHandlersToShadowRoot(shadowRoot) {
    const currentUrl = window.location.href.split('?')[0]

    let shouldChangeUrl = false;
    shadowRoot.addEventListener("click",()=>{
      shouldChangeUrl = true;
    })

    shadowRoot.querySelectorAll("#container > details").forEach((item)=>{
      item.addEventListener("toggle",(event)=>{

        if(shouldChangeUrl){
          const url = new URL(location);

          if(event.newState === "open"){
            url.searchParams.set(event.target.id, "show")
            window.history.pushState({},'',`${currentUrl}?${event.target.id}=show`)
          } else {
            window.history.pushState({},'', currentUrl)

          }
          shouldChangeUrl = false;
        }

      })
    })
  }
  getTemplateStyle() {

    return `
      <style>
        #container > details > summary {
          font-weight: 600;
        }
        
        #container > details[open] {
          border-bottom: 1px solid black;
        }
        
        #guidelines-list li {
          margin-top:1rem;
        }
    
        .summary-level-one {
          font-size:1.5rem;
          margin-top:1rem;
        }
    
        @media screen and (width < 32em) {
          ul {
            padding:0;
          }
        }
      </style>`
  }

  render() {

    const urlParams = new URLSearchParams(document.location.search);

    return `
      <div id="container">
        
        <h1>A tutorial on using places.js</h1>
        <p>By Bharat Ponnaluri</p>
        
        <details id="identify-problem-details" ${urlParams.get("identify-problem-details") ? "open" : ''}>
          <summary class="summary-level-one">
            1.Identify what problem you are trying to solve
          </summary>
          <p> It is important to understand why you are using a new technology, and this requires understanding your 
          goal. One should not be writing code or installing a framework without this understanding. Unless the goal is
           something specific to yourself such as learning a JavaScript component framework, then you should also
           spend time talking to potential users.</p>
                   
         <p>For example, I decided to create a location listing component using a map after a Strong Towns DMV 
         discussion about community bulletin boards. We were talking about locations for bulletin boards to post event 
         information, and there wasn't an existing source of information.</p>
         
         <p>On the other hand, there are instances where places.js or another web-based solution isn't useful. I
         considered using places.js to create a simple timer application that could help mindful breating with on
         a consistent interval. However, I came to the conclusion that it is better to learn in person from someone
         who is experienced with mindful breathing, or self-learn, and then breathe mindfully without using any 
         electronics. Using an online timer involves an extra step, and it can lead to being distracted from mindfulness
         by Internet browsing. </p>

        </details>

        <details id="setup-instructions-component-details" ${urlParams.get("setup-instructions-component-details") ? "open" : ''}>
          <summary class="summary-level-one">
            2. Set up places.js
          </summary>
          <setup-guide-component></setup-guide-component>
        </details>
        
         <details id="part-three" ${urlParams.get("part-three") ? "open" : ''}>
          <summary class="summary-level-one">
            3. Create list with the ability to add items
          </summary>
        </details>
 
        <details id="part-four" ${urlParams.get("part-four") ? "open" : ''}>
          <summary class="summary-level-one">
            4. Create map and connect it with list
          </summary>
        </details>
        
        <details id="part-five" ${urlParams.get("part-five") ? "open" : ''}>
          <summary class="summary-level-one">
            5. Add ability to edit items by clicing on them.
          </summary>
        </details>
        
         <details id="part-six" ${urlParams.get("part-six") ? "open" : ''}>
          <summary class="summary-level-one">
            6. Add ability to delete items
          </summary>
        </details>
        
         <details id="part-seven" ${urlParams.get("part-seven") ? "open" : ''}>
          <summary class="summary-level-one">
            7. JSON export and import
          </summary>
        </details>
        
         <details id="part-seven" ${urlParams.get("part-seven") ? "open" : ''}>
          <summary class="summary-level-one">
            8. Displaying error information by connecting to an API endpoint that does not exist.
          </summary>
        </details>
  
    `
  }
}