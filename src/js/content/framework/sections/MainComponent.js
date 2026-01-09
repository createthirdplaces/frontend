
import {BaseDynamicComponent} from "../../../shared/lib/places-js-latest.js";

export class MainComponent extends BaseDynamicComponent {

  constructor() {
    super();
  }

  attachHandlersToShadowRoot(shadowRoot) {

    const currentUrl = window.location.href.split('?')[0]

    let shouldChangeUrl = false;
    shadowRoot.addEventListener("click", () => {
      shouldChangeUrl = true;
    })

    shadowRoot.querySelectorAll("#container > details").forEach((item) => {
      item.addEventListener("toggle", (event) => {

        if (shouldChangeUrl) {
          const url = new URL(location);

          if (event.newState === "open") {
            url.searchParams.set(event.target.id, "show")
            window.history.pushState({}, '', `${currentUrl}?${event.target.id}=show`)
          } else {
            window.history.pushState({}, '', currentUrl)

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

      <details id="setup-instructions-component-details" ${urlParams.get("setup-instructions-component-details") ? "open" : ''}>
        <summary class="summary-level-one">
          Getting started
        </summary>
        <setup-instructions-component></setup-instructions-component>
      </details>

      <h2>Classes</h2>

      <details id="base-dynamic-component-details" ${urlParams.get("base-dynamic-component-details") ? "open" : ''}>
        <summary>
          BaseDynamicComponent
        </summary>
        <base-dynamic-component-doc></base-dynamic-component-doc>  
      </details>

      <details id="base-template-component-details" ${urlParams.get("base-template-component-details") ? "open" : ''}>
        <summary>
          BaseTemplateComponent
        </summary>
        <base-template-component-doc></base-template-component-doc>
      </details>

      <details id="data-store-details" ${urlParams.get("data-store-details") ? "open" : ''}>
        <summary>
          DataStore
        </summary>
        <data-store-doc></data-store-doc>
      </details>

      <details id="api-load-action-details" ${urlParams.get("api-load-action-details") ? "open" : ''}>
        <summary>
          ApiLoadAction
        </summary>
        <api-load-action-doc></api-load-action-doc>
      </details>

      <details id="custom-load-action-details" ${urlParams.get("custom-load-action-details") ? "open" : ''}>
        <summary>
          CustomLoadAction
        </summary>
        <custom-load-action-doc></custom-load-action-doc>
      </details>

      <details id="data-store-load-action-details" ${urlParams.get("data-store-load-action-details") ? "open" : ''} >
        <summary>
          DataStoreLoadAction
        </summary>
        <p>Defines an action used to load data into a store. Places.js includes two classes used for 
        load actions, ApiLoadAction, and CustomLoadAction.</p>
      </details>

      <h2>Objects</h2>

      <details id="api-action-type-details" ${urlParams.get("api-action-type-details") ? "open" : ''} >
        <summary>
          ApiActionType
        </summary>
        <p>Stores string representations for DELETE, GET, POST, and PUT API actions. </p>
      </details>

      <details id="data-store-load-config-details" ${urlParams.get("data-store-load-config-details") ? "open" : ''}>
        <summary>
          DataStoreLoadConfig
        </summary>
        <div id="data-store-load-config-info">
          <p>Configuration settings describing how a data store can be loaded from an API.
           The following fields can be used.</p>
          <ul>
            <li>
              <b>body</b>: Data that should be sent as part of the request body.
            </li>
            <li>
              <b>headers</b>: A list of headers included with the request.
            </li>
            <li>
              <b>method</b>: The API request method, GET, POST, PUT, ...etc. GET will be used by default if
              no value is specified.
            </li>
            <li>
              <b>url</b>: Required field representing the URL for the API request.
            </li>
          </ul>
        </div>
      </details>

      <details id="functions-details" ${urlParams.get("functions-details") ? "open" : ''}>
        <summary class="summary-level-one">Functions</summary>
        <h3>clearSessionStorage()</h3>

        <p>Clears GET API request cache and other data in session storage.</p>

        <h3>addLocalStorageData()</h3>
        <p>Adds data to session storage for use. The access token
          data stored with the field "accessToken will be used in API requests.</p>

        <h3>deleteLocalStorageData(key)</h3>
        <p>Deletes data from local storage.</p>

        <h3>getLocalStorageDataIfPresent(key)</h3>
        <p>Retrieves data from local storage if present.</p>

        <h3>getResponseData(dataStoreLoadConfigInfo)</h3>
        <p>Static asynchronous method to fetch data from an API. Use this method if the API request needs
         to be run as part of an event handler and no other components subscribe to the request.
         Cache data will not be used or updated. See DataStoreLoadConfig for more information about the parameters.</p>
      </details>

      <h2>Examples</h2>

      <a href="locationListingTutorial.html">Creating a location listing page with places.js</a>
      <br>
      <br>

      <details id="example-details" ${urlParams.get("example-details") ? "open" : ''}>
         <summary>Show/hide component</summary>
        <show-hide-component-guide></show-hide-component-guide>
      </details>


      <details id="guidelines-details" ${urlParams.get("guidelines-details") ? "open" : ''}>
          <summary class="summary-level-one">Guidelines for using places.js</summary>
        <guidelines-component></guidelines-component>
      </details>

      <details id="framework-history-details" ${urlParams.get("framework-history-details") ? "open" : ''}>
          <summary class="summary-level-one">Early history of places.js - Bharat Ponnaluri</summary>
        <framework-history-component></framework-history-component>
      </details>


       <h2>Notes about the design goals of places.js</h2>

      <details id="ui-state-reason" ${urlParams.get("ui-state-reason") ? "open" : ''}>

        <summary>UI state that easy to reason about</summary>

        <p>Code should be understandable by people familiar with CSS, HTML,
        and JavaScript without having to spend a long time learning about framework specific abstractions. This means
        developers can spend more time learning about what users are looking for and improving quality.
        </p>

        <p>Places.js uses synchronous  publish subscribe code to make sure components have correct UI state. While there is
        some complexity from the fact that the components are coupled with state management logic, it reduces complexity
        by making the code easier to reason about. When there is a logic error in a places.js component, understanding
        how and when the component is updated helps address bugs. The synchronous updates also help when generating stack
        traces to give information about the cause of an error.</p>

        <p>If multiple components are subscribed to the state, the components will be updated in the order that
        they were added to the DOM. As a result, parent components will always be updated before child components.
        If a parent component and a child component are subscribed to the same state, the child component will be
        temporarily unsubscribed from the state when the parent component re-renders. When the child component
        re-renders, it will then subscribe again to the shared state. Then, it will synchronously read the shared state
        and re-render.</p>
      </details>

      <details id="user-testing-and-feedback" ${urlParams.get("user-testing-and-feedback") ? "open" : ''}>

        <summary>Encourage human user testing and feedback</summary>

        <p>Human user testing is helpful for subjective criteria
        such as usability that cannot be tested with automation. Places.js is designed around the idea that complexity
        on the frontend is minimized, while the backend has most of the complexity. Minimizing complexity on the frontend
        will help make sure that UI testing can focus on subjective criteria that is relevant for a user. Most of the
        testing for places.js has been done through manual testing of a local dmvboardgames.com instance. Complexity for
        dmvboardgames.com
        is mainly on the <a href="https://github.com/gatherspiel/backend">backend</a>, which includes comprehensive
        <a href="https://github.com/gatherspiel/backend/tree/main/src/test/java/app">database integration tests.</a></p>

        <p>Also, places.js is designed to support open source projects. With open source projects, automated
        UI testing code is also a publicly available set of instructions that someone could use to help create
        an unauthorized scraper for a website.</p>

        <p>Places.js components are also built with shadow DOM to encapsulate styles and make it harder for bots to scrape
          content. This increases the complexity of writing automated UI tests. On the other hand, places.js is also has
          support for asynchronous data fetching from a backend API, and automated testing efforts should be focused there.
          API endpoints used by places.js should have clearly defined correct behavior not defined by subjective criteria,
          and they should be covered by automated testing.</p>

        <p>Any automated testing on UI code should be unit tests or integration tests with the backend. These
        types of tests can be written with clearly defined success criteria that is the same for every user.Automated
        UI testing is also testing the behavior of a UI, and cannot test subjective such as determining if a button
        is not too big, or whether a particular shade of blue is helpful for users. </p>
      </details>

      <details id="prioritize-usability" ${urlParams.get("prioritize-usability") ? "open" : ''}>

        <summary>Ensure that usability is prioritized</summary>

        <p>Places.js supports developers to make websites that are as
          straightforward as possible from a user perspective.</p>

        <h3>Promote creating websites without the use of generative AI tools such as ChatGPT, GitHub Copilot, or
          Claude Code</h3>

        <p>The documentation uses a places.js shadow DOM component and a couple of other measures to
          make sure bots are less likely to be able to scrape the documentation. Places.js is also new, and
          generative AI tools aren't likely to have a large amount of training data for the framework that they can
          use.</p>
      </details>

      <details id="render-entire-component" ${urlParams.get("render-entire-component") ? "open" : ''}>

        <summary>Re entire component when the state of a component changes</summary>

        <p>Re-rendering a component for every state change does have some performance overhead.
          However, the performance overhead does come with the benefit of making cde easier to reason about.
          One possible way of optimising rendering is by using virtual DOM diffing. While virtual
          DOM diffing is likely to make re-rendering of places.js components faster, it does have costs. If a site made with
          places.js is complex enough to the point where it is slow, then optimizing with virtual DOM isn’t going to fix
          underlying issues with UI complexity or an architecture that should be updated.
        </p>

        <p>
          Virtual dom diffing would add complexity to places.js, which would make the framework significantly harder
          to test and increase the risk of bugs. Also, virtual dom diffing introduces a layer of complexity that makes
          it harder to reason about updates that are being made. When a places.js component is updated, all
          the DOM within the component is re-rendered.
        </p>

        <p>
          <a href="https://krausest.github.io/js-framework-benchmark/">Performance benchmarks</a> comparing the React and
          Solid JS libraries indicate the React is significantly slower. React uses virtual DOM, and Solid does not.
          Both libraries are also designed for interactive component based UIs.
        </p>
        <p>
          If an entire UI component should not re-render every time there is a state change, one alternative could
          be to split up the component and have each one of smaller components subscribed ot the state.
        </p>
      </details>
  <br>
    </div>
  `
  }
}