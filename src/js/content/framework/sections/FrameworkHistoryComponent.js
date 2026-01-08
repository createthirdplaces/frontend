export class FrameworkHistoryComponent extends  HTMLElement {
  connectedCallback(){
    this.innerHTML = `
      <p>I started regularly hosting public board game events in 2021 through Meetup.com.  As a host, I noticed  finding 
      viable public spaces became  increasingly difficult. Other people I spoke with also said they were having
       challenges with finding space to host events. I decided to start working on addressing this issue by working to 
       promote the creation of public third places.</p>

      <p> I started working on <a href="https://dmvboardgames.com/">dmvboardgames.com</a> with a goal 
      of promoting third places through helping people find and host board game events. Also, I was hosting 
       events through Meetup.com. Myself and others I spoke to were having increasing challenges with the site due to
       paywalled features, UI glitches, increased costs, and slow page loading times. I realized an open source
       non-commercial alternative to Meetup would be more effective at promoting third places.</p>
      
      <p>After briefly using React for dmvboardgames.com, I decided to move to using vanilla JavaScript. I was
      concerned about the learning curve of the codebase if it was written in React, and I was concerned about
      maintaining code quality. For a while, I considered using another JavaScript framework or library. However,
      I decided it was better to prioritize minimizing dependencies, and I didn't know enough about other component
      libraries to determine if they made sense for dmvboardgames.com</p> 
       
      <p>After a while, I started extracting shared code into framework to help development of future features or 
      other websites. I also wanted a framework that would prioritize the needs of websites promoting in person 
      interaction to help with increasing interest in third places. Also, I thought framework could be useful for other 
      developers.  </p>
      
      <details>
        <summary>More details about why I decided to create my own framework instead of using React</summary>
         <p> I was also concerned about the many ways of doing things in React and the challenges of finding consistent
        quality documentation. For example, I was working on investigating ways to optimize rendering speed of a complex
        UI made in React, and online resources explaining minimizing unnecessary component rendering with useMemo
        were inconsistent. I also remember overusing React Context to store complex dynamic UI state in addition to
        challenges finding better ways of storing complex state because many online guides were recommending React Context.
        </p>
      
        <p> I noticed a consistent pattern of developers including myself running to challenges  with React. At the time I 
        decided to move to using vanilla JavaScript, I had spend close to a year specializing in
        frontend  development with React in addition to intermittent React use since 2018. I looked back at the React code 
        I had written over the past 3 years, and realized much of it did not make sense. I was trying to leverage my vanilla
        JS and backend Java experience, and much of it did not apply to React. Also, I noticed that other experienced 
        developers I worked with had a hard time with React. </p>
      </details>
    `
  }
}