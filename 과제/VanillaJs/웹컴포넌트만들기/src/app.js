const $ul = document.querySelector("#todo-list");
const $addBtn = document.querySelector("#add-btn");

class Component {
  $target;
  $state;
  constructor() {}
  //method
  setup() {}
  template() {
    return "";
  }
  render() {}
  setEvent() {}
  setState() {}
}

class App extends Component {
  setup() {}
  template() {}
  setEvent() {}
}

new App(document.querySelector("#todo-list"));
let state = {
  items: ["item1", "item2", "item3"],
  oters: ["1", "2"],
};

function render() {
  const { items } = state;
  $ul.innerHTML = `
    <ul>
     ${items.map((item) => `<li>${item}</lit>`).join("")}
    </ul>
  `;
}

function setState(newState) {
  console.log("현재 state)", state);
  console.log("추가될 State,", newState);
  state = { ...state, ...newState };
  console.log("변경된 State: ", state);
  render();
}

function onclickAdd() {
  const { items } = state;
  const addedItem = `item${items.length + 1}`;
  const addedItems = [...items, addedItem];
  setState({ items: addedItems });
}

render();
$addBtn.addEventListener("click", onclickAdd);
