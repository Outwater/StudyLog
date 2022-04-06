import App from "./App.js";
import { getItem } from "./storage.js";

const data = getItem("todos", [{ text: "첫번째 " }]);

const $app = document.querySelector(".app");

new App({ $target: $app, initialState: data });
