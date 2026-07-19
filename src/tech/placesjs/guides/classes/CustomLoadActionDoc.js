export class CustomLoadActionDoc extends HTMLElement {
  connectedCallback(){
    this.innerHTML = `
     <div id="custom-load-action-class-guide">
        <p>Defines a custom data store load action with direct control over any async calls that are made.
          It is intended for use when additional processing needs to be done after an async call, or if a store needs
          to combine data from multiple sources.</p>

        <details open>
          <summary>Here is an example of a load action that will attempt to logout by calling an
          external service used to manage authentication. If the logout attempt succeeds, the user's auth token will
          be deleted and they will be redirected to index.html. If the logout attempt fails, an error message
          will be returned.</summary>
          <base-code-display-component>
async function retrieveData() {
  const data = await fetch(
    \`\${LOGIN_CLIENT_URL}/auth/v1/logout?scope=global\`,
    {
      method: "POST",
      headers: {
        apiKey: SUPABASE_CLIENT_KEY,
        authorization:
        "bearer " +
        (await getLocalStorageDataIfPresent(AUTH_TOKEN_KEY))?.access_token,
      },
    },
  );
  if (data.ok) {
    deleteLocalStoreData(AUTH_TOKEN_KEY);
    window.location.assign("/index.html");
    return new AuthResponse(false);
  } else {
    return new AuthResponse(
      true,
      {},
      "Failed to logout:" + JSON.stringify(data),
    );
  }
}

export const LOGOUT_STORE = new DataStore(new CustomLoadAction(retrieveData));

class AuthResponse {
  constructor(loggedIn, data, error) {
    this.loggedIn = loggedIn;
    this.data = data;
    this.errorMessage = error ?? "";
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  getData() {
    return this.data;
  }

  getErrorMessage() {
    return this.errorMessage || this.errorMessage.length > 0
      ? this.errorMessage.toString()
      : "";
  }
}         </base-code-display-component>
        </details>
    
    `
  }
}