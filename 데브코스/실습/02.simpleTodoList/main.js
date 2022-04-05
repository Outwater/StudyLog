const data = [
  { id: 0, text: "todo1" },
  { id: 1, text: "todo2" },
];

const $app = document.querySelector(".app");

new App({ $target: $app, initialState: data });
