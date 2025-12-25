import {BaseTemplateComponent} from "../../shared/lib/places-js-latest.js"

export class FaqComponent extends BaseTemplateComponent {
  getTemplateStyle(){
    return `
    <style>
      summary {
        font-size: 1.5rem;
        font-weight: 600;
      }
    </style>`
  }

  render() {
    return `
      <details>
        <summary>FAQ</summary>
        <h3>Why is JavaScript being used to render static content?</h3>
        <p>The main reason is to place content inside shadow DOM to make it more difficult for bots to parse. Automated
         traffic is not authorized to access createthirdplaces.com, and the shadow DOM is a backup measure if bots 
         bypass other measures for blocking automated traffic. The shadow DOM also gives the ability to encapsulate
          styles.</p>
          
        <h3>How does Create Third Places support website accessibility?</h3>
        
         <p>The Create Third Places website has a straightforward design to minimize complexity that could
         affect assistive technology. As an entity that prioritizes accessible public spaces, it is important to also
         make sure information about events in these spaces is also accessible. </p>
         
         <p>
         If you notice any issues using createthirdplaces.com with assistive
          technology, email gulu@createthirdplaces.com or create a bug report 
          <a href="https://github.com/createthirdplaces/frontend">here.</a> Code contributions to improve accessibility
           in the form of a pull request are also welcome.</p>
         
        <h3>Why does Create Third Places not have a social media presence?</h3>
        
        <p>Create Third Places believes that social media websites are designed to keep people online. Create Third Places
        advocates for websites that help people find in person events without spending a large amount of time online.</p>
      </details>
    `
  }
}