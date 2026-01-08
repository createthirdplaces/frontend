import {HtmlCodeDisplayComponent} from "../shared/HtmlCodeDisplayComponent.js";

export class VanillaJsClickResizeExample extends HtmlCodeDisplayComponent {
  getCode(){
    return `<html>
  <head>
  <!--Additional setup -->
    <style>
      img {
        width: 100%;
        height: 100%;
        object-fit: scale-down;
      }
      .image-container {
        display: block;
        height: 200px;
        margin-bottom: 0.5rem;
        width: 200px;
      }
      .image-container-clicked {
        display: block;
        height: 100%;
        margin-bottom: 0.5rem;
        width: 100%;
      }
    </style>
    <script type="module">
      <!-- Additional script logic and JS imports -->
      window.addEventListener('load', ()=>{
        for (const item of document.getElementsByClassName('image-container')){
          item.addEventListener("click",()=>{
            if(item.className !== 'image-container-clicked'){
              item.className = 'image-container-clicked';
            } else {
              item.className = 'image-container';
            }
          })
        }
      })
    </script>
  </head>
  <body>
    <!-- Additional HTML -->
    <div class="image-container">
      <img src="/images/events/meetup/SlowLoadA.png">
    </div>
    <div class="image-container">
      <img src="/images/events/meetup/SlowLoadB.png">
    </div>
    <div class="image-container">
      <img src="/images/events/meetup/RecapPopup.png">
    </div>
    <!-- Additional HTML -->
  </body>
</html>`
  }
}