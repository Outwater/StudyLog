import App from "./app.js";

class Main {
  constructor() {
    const $app = document.querySelector("#app");
    new App($app);
  }
}

new Main();
