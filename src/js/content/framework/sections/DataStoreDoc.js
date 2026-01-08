export class DataStoreDoc extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
        <p>Stores state that is shared between components or state from an external
        source.</p>
        <h4>Constructor parameters</h4>
        <ul>
          <li><b>loadAction</b>: An instance of DataStoreLoadAction describing how data should be loaded into a store.
          Data loading is asynchronous.</li>
        </ul>
        <h4>Functions</h4>
        <ul>
          <li>
            <b>fetchData(params,dataStore)</b>:Retrieves data from an external source and then updates 
            subscribers<b>. It is strongly recommended that this method is only called from component
            event handlers.</b>
            It has the following parameters <br>
            <ul>
              <li>
                <b>params: </b>Parameters that describe the API request.
              </li>
              <li>
                <b>dataStore:</b>An optional data store that will be subscribed to updates from this store.
              </li>
            </ul>
          </li>
          <li>
            <b>getStoreData</b>: Returns a read only reference to store data.
          </li>
          <li>
            <b>isWaitingForData</b>: Returns false if the data in the store is null or undefined and is
            not in a loading state. Otherwise, it returns false.
          </li>
          <li>
            <b>updateStoreData(storeUpdates)</b>: Updates data in the store and trigger a render of components
            subscribed to the store. Only fields specified by the store updates parameter will be modified. <b>
            It is strongly recommended that this method is only called from event handlers.</b>
          </li>
        </ul>
          <details open>
            <summary>Example</summary>
            <base-code-display-component>
import { ApiLoadAction, DataStore } from "@bponnaluri/places-js";
import { API_ROOT } from "../../ui/shared/Params.js";

function getUserQueryConfig() {
  return {
    url: API_ROOT + "/user",
  };
}

export const USER_DATA_STORE = new DataStore(
  new ApiLoadAction(getUserQueryConfig);
);</base-code-display-component>
      </details> 
    `
  }
}