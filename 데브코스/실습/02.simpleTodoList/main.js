const data = storage.getItem("todos", [{ text: "첫번째 " }]);

const $app = document.querySelector(".app");

new App({ $target: $app, initialState: data });
